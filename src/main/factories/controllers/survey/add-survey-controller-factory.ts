import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
