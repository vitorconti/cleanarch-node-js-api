import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('/POST /survey', () => {
    test('Should return 204 on create survey', async () => {
      await request(app)
        .post('/api/survey')
        .send({ question: 'any_question', answers: [{ image: 'any_img', answer: 'any_answer' }] })
        .expect(204)
    })
  })
})
