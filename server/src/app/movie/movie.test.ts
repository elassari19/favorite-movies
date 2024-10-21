import request from 'supertest';
import { prisma } from '../../utils/configs';
import { redisCacheHandler, redisCacheClear } from '../../utils/redisCache';
import { createApp } from '..';

jest.mock('../../utils/configs', () => ({
  prisma: {
    movie: {
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

describe('Movie Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /v1/api/movie', () => {
    it('should get a movie by id', async () => {
      const mockMovie = {
        title: 'Test Movie',
        description: 'Test Description',
        duration: 60,
      };
      (redisCacheHandler as jest.Mock).mockResolvedValue(mockMovie);

      const response = await request(app).get('/v1/api/movie/?id=1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMovie);
    });

    it('should get all courses', async () => {
      const mockGetAllMovie = [
        {
          title: 'Test Movie 1',
          description: 'Test Description',
          duration: 60,
        },
        {
          title: 'Test Movie 2',
          description: 'Test Movie 2',
          duration: 60,
        },
      ];
      (redisCacheHandler as jest.Mock).mockResolvedValue(mockGetAllMovie);

      const response = await request(app).get('/v1/api/movie/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockGetAllMovie);
    });
  });

  describe('POST /v1/api/movie', () => {
    // Mock the authentication middleware
    jest
      .spyOn(
        require('../../middelwares/passport.middelware'),
        'isAdminOrTeacher'
      )
      .mockImplementation((req, res, next) => {
        // @ts-ignore
        req.user = { id: 'user123' };
        // @ts-ignore
        next();
      });

    it('should create a new movie', async () => {
      const mockCreateMovie = {
        title: 'Test Movie',
        description: 'Test Description',
        duration: 60,
      };
      (prisma.movies.create as jest.Mock).mockResolvedValue(mockCreateMovie);

      const response = await request(app)
        .post('/v1/api/movie')
        .send(mockCreateMovie);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreateMovie);
      expect(redisCacheClear).toHaveBeenCalledWith('movie:*');
    });
  });

  describe('PUT /v1/api/movie', () => {
    it('should update a movie', async () => {
      const mockPutMovie = {
        title: 'Test Update Movie',
        description: 'Test Update Description',
        duration: 60,
      };
      (prisma.movies.update as jest.Mock).mockResolvedValue(mockPutMovie);
      const response = await request(app)
        .put('/v1/api/movie/?id=1')
        .send(mockPutMovie);

      expect(response.status).toBe(203);
      expect(response.body).toEqual(mockPutMovie);
      expect(redisCacheClear).toHaveBeenCalledWith('movie:*');
    });
  });

  describe('DELETE /v1/api/movie', () => {
    const mockDeletedMovie = [
      {
        id: '1',
        title: 'Deleted Movie',
        description: 'Deleted Description',
        duration: 60,
      },
      {
        id: '2',
        title: 'Deleted Movie 2',
        description: 'Deleted Description 2',
        duration: 60,
      },
    ];

    it('should delete a movie', async () => {
      (prisma.movies.delete as jest.Mock).mockResolvedValue(
        mockDeletedMovie[0]
      );

      const response = await request(app).delete('/v1/api/movie?id=1');
      console.log('response', response.body);

      expect(response.status).toBe(203);
      expect(response.body).toEqual(mockDeletedMovie[0]);
      expect(redisCacheClear).toHaveBeenCalledWith('movie:*');
    });

    it('should delete many courses', async () => {
      (prisma.movies.deleteMany as jest.Mock).mockResolvedValue(
        mockDeletedMovie
      );

      const response = await request(app)
        .delete('/v1/api/movie/many')
        .send({ ids: ['1', '2'] });

      expect(response.status).toBe(203);
      expect(response.body).toEqual(mockDeletedMovie);
      expect(redisCacheClear).toHaveBeenCalledWith('movie:*');
    });

    it('should delete all courses', async () => {
      (prisma.movies.deleteMany as jest.Mock).mockResolvedValue(
        mockDeletedMovie
      );

      const response = await request(app).delete('/v1/api/movie/all');

      expect(response.status).toBe(203);
      expect(response.body).toEqual(mockDeletedMovie);
      expect(redisCacheClear).toHaveBeenCalledWith('movie:*');
    });
  });
});
