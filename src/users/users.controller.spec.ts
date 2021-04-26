import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsers = [
    {
      id: '233223',
      firstName: 'FirstName',
      lastName: 'lastname',
      role: Role.ADMIN,
      password: '3232',
      email: 'mail@mail.com',
    },
  ];

  const mockUserService = {
    create: jest
      .fn()
      .mockImplementation((user: CreateUserDto) =>
        Promise.resolve({ id: 'uuid', ...user }),
      ),
    update: jest.fn().mockImplementation((id: string, user: UpdateUserDto) => {
      Promise.resolve({ id, ...user });
    }),
    findAll: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest
      .fn()
      .mockImplementation((id: string) =>
        Promise.resolve({ id, ...mockUsers[0] }),
      ),
    findByLogin: jest
      .fn()
      .mockImplementation((email: string, password: string) =>
        Promise.resolve(mockUsers[0]),
      ),
    findByPayload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be controller defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be service defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    expect(await mockUserService.findAll()).toEqual(mockUsers);
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
      role: Role.MECHANIC,
    };
    expect(await controller.create(dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
      role: Role.MECHANIC,
    };
    expect(await controller.update('id', dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });
    expect(mockUserService.update).toHaveBeenCalledWith('id', dto);
  });
});
