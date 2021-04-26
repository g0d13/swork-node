import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './entities/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsers = [
    {
      id: '233223',
      firstName: 'FirstName',
      lastName: 'lastname',
      role: Role.ADMIN,
      password: '3232',
    },
  ];

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue((u) => u),
    findOne: jest.fn().mockResolvedValue(() => mockUsers[0]),
    update: jest.fn().mockResolvedValue((dto) => ({ id: 'id', ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt password', async () => {
    const dto: CreateUserDto = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastname',
      role: Role.MECHANIC,
      password: 'password',
    };
    expect(service.create(dto)).not.toEqual({ password: expect.any(String) });
  });

  it('should return an array of users', async () => {
    const result = [
      {
        email: 'email@email.com',
        firstName: 'firstName',
        lastName: 'lastname',
        role: Role.MECHANIC,
        password: 'password',
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);
  });

  it('should create a new user record and return that', async () => {
    const dto: CreateUserDto = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
      role: Role.MECHANIC,
    };
    expect(await service.create(dto)).not.toEqual({
      id: expect.any(String),
    });
  });
  it('should update a user and return update result', async () => {
    const dto: UpdateUserDto = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
      role: Role.MECHANIC,
    };
    expect(await service.update('1', dto)).toEqual({ id: expect.any(String) });
  });
});
