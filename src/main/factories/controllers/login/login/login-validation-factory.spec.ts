import { EmailValidator } from '../../../../../validation/protocols/email-validator'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeLoginValidation()
    const requiredFields = ['email', 'password']
    const validations: Validation[] = requiredFields.map(requiredField => new RequiredFieldValidation(requiredField))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
