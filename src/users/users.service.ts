import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/interfaces/payload.interface';
import { Not, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsNull } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.enum';
import { Request } from 'src/requests/entities/request.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findAllMechanicsWithoutRelations() {
    const entities = await this.usersRepository
      .createQueryBuilder('user')
      .select('u')
      .from(User, 'u')
      .leftJoinAndSelect('u.log', 'log')
      .where("log IS NULL AND u.role='MECHANIC'")
      .getMany();

    return entities;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: [{ id }],
    });
  }

  async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['password', 'email', 'id', 'role'],
    });

    if (!user) {
      throw new HttpException(
        'El usuario no se encuentra registrado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // compare passwords
    const areEqual = await user.validatePassword(password);

    if (!areEqual) {
      throw new HttpException(
        'Email o contrasena incorrecta',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    return user;
  }

  async findByPayload({ email }: JwtPayload) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(userDto: CreateUserDto) {
    const { email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.usersRepository.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }
    if (userDto.password === '') delete userDto.password;
    const user = this.usersRepository.create({ ...userDto });
    const savedUser = this.usersRepository.save(user);
    delete (await savedUser).password;
    return savedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userInDb = await this.usersRepository.findOne({
      where: { id },
    });

    if (userInDb == null) {
      throw new NotFoundException('no se encuentra el usuario');
    }

    const user = this.usersRepository.create({ id, ...updateUserDto });
    if (updateUserDto.password !== undefined) {
      await user.hashPassword();
    }
    const userToReturn = await this.usersRepository.save(user);
    delete user.password;
    return userToReturn;
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
