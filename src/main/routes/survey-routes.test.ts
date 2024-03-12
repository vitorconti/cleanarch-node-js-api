import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'

let surveyCollection: Collection

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('/POST /survey', () => {
    test('Should return 403 add survey without accessToken', async () => {
      await request(app)
        .post('/api/survey')
        .send({ question: 'any_question', answers: [{ image: 'any_img', answer: 'any_answer' }] })
        .expect(403)
    })
    test('Should return 204 add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'jose',
        email: 'joseconti@teste.com',
        password: 123,
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send({ question: 'any_question', answers: [{ image: 'any_img', answer: 'any_answer' }] })
        .expect(204)
    })
  })
  describe('GET /survey', () => {
    test('Should return 403 load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })
    test('Should return 204 on load surveys with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'jose',
        email: 'joseconti@teste.com',
        password: 123
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
