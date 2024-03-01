import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const requiredFields = ['email', 'password']
  const validations: Validation[] = requiredFields.map(requiredField => new RequiredFieldValidation(requiredField))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
