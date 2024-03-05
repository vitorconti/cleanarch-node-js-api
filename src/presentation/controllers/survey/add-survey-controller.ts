import { badRequest, serverError } from '../../helpers/http/http-helper'
import { AddSurvey, AddSurveyModel, Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const addSurveyDataModel: AddSurveyModel = httpRequest.body
      await this.addSurvey.add(addSurveyDataModel)
      return await new Promise(resolve => resolve({
        body: {},
        statusCode: 1
      }))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
