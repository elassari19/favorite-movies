import request from 'supertest';
import { prisma } from '../../utils/configs';
import { redisCacheHandler, redisCacheClear } from '../../utils/redisCache';
import { createApp } from '..';

jest.mock('../../utils/configs', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));

jest.mock('../../utils/redisCache', () => ({
  redisCacheHandler: jest.fn(),
  redisCacheClear: jest.fn(),
}));

const app = createApp();

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST: /v1/api/auth', () => {
    const mockCreate = {
      fullname: 'user name',
      email: 'user email',
      role: 'STUDENT',
      password: 'password',
      confirmPassword: 'password',
      address: 'user address',
    };
    it.only('Should sign-up field, not valid data', async () => {
      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreate);

      const response = await request(app).post('/v1/api/auth').send({
        email: mockCreate.email,
        password: mockCreate.password,
        role: mockCreate.role,
      });
      console.log('response-auth', response.body);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreate);
      expect(redisCacheClear).toHaveBeenCalledWith('course:*');
    });

    it('Should sign-up field, password not match', async () => {});

    it('Should sign-up success', async () => {});
  });

  describe('sign-in by email and password', () => {
    it('Should sing-in field, user not found', async () => {});

    it('Should sign-in field, wrong passowrd', async () => {});

    it('Should sign-in success', async () => {});
  });

  describe('sign-out', () => {
    it('Should sing-out success', () => {});
  });
});
