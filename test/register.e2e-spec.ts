import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Auth Register (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dataSource.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  });

  it('/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer()).post('/auth/register').send({
      email: 'tester@gmail.com',
      password: '172736Aa!',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      id: expect.any(String),
      email: 'tester@gmail.com',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
