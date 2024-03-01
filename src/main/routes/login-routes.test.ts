import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('/POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'jose',
          email: 'joseconti@teste.com',
          password: 'teste',
          passwordConfirmation: 'teste'
        })
        .expect(200)
    })
  })
  describe('/POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('teste', 12)
      await accountCollection.insertOne({
        name: 'jose',
        email: 'joseconti@teste.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'joseconti@teste.com',
          password: 'teste'
        })
        .expect(200)
    })
  })
})