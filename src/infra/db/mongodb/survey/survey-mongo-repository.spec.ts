import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import env from '../../../../main/config/env'

let surveyCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'any_other_answer'
    }],
    date: new Date()
  }
}
describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('add()', () => {
    test('Should create a survey on call add method', async () => {
      const sut = makeSut()
      const fakeSurvey = makeFakeSurvey()
      await sut.add(fakeSurvey)
      const survey = await surveyCollection.findOne({ question: fakeSurvey.question })
      expect(survey).toEqual(fakeSurvey)
    })
  })
  describe('loadAll()', () => {
    test('Should create a survey on call add method', async () => {
      const sut = makeSut()
      const fakeSurvey = makeFakeSurvey()
      await sut.add(fakeSurvey)
      const survey = await surveyCollection.findOne({ question: fakeSurvey.question })
      expect(survey).toEqual(fakeSurvey)
    })
  })
})
