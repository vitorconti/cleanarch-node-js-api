import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'
import { Validation } from '../../../../../presentation/protocols/validation'
import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  const validations: Validation[] = requiredFields.map(requiredField => new RequiredFieldValidation(requiredField))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
