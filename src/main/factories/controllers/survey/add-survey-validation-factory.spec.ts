import { Validation } from '../../../../presentation/protocols/validation'
import { makeSurveyValidation } from './add-survey-validation-factory'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'

jest.mock('../../../../validation/validators/validation-composite')

describe('Survey Validation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeSurveyValidation()
    const requiredFields = ['question', 'answers']
    const validations: Validation[] = requiredFields.map(requiredField => new RequiredFieldValidation(requiredField))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
