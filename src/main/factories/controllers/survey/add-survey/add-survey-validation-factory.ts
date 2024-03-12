import { Validation } from '../../../../../presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeSurveyValidation = (): ValidationComposite => {
  const requiredFields = ['question', 'answers']
  const validations: Validation[] = requiredFields.map(requiredField => new RequiredFieldValidation(requiredField))

  return new ValidationComposite(validations)
}
