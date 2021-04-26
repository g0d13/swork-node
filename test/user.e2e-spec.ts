import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/users/entities/role.enum';

describe('UserController (e2e)', () => {
  let app: INestApplication;

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
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue((id) => mockUsers[id]),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 'id', ...user })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUsers);
  });

  it('/users (POST)', async () => {
    const user = mockUsers.pop();
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect('Content-Type', /json/);
    delete user.password;
    expect(response.body).toEqual({ id: expect.any(String), ...user });
  });
});
