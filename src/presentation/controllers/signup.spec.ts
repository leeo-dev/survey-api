import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-erro'
import { InvalidParamError } from '../errors/invalid-param-erro'
import { EmailValidator } from '../protocols/email-validator'

interface sutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): sutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // suit under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('name')) // Compara apenas os valores
  })
  test('Should return 400 if no email is provided', () => {
    // suit under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('email')) // Compara apenas os valores
  })
  test('Should return 400 if no password is provided', () => {
    // suit under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('password')) // Compara apenas os valores
  })
  test('Should return 400 if no password confirmation is provided', () => {
    // suit under test
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation')) // Compara apenas os valores
  })
  test('Should return 400 if an invalid email is provided', () => {
    // suit under test
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new InvalidParamError('email')) // Compara apenas os valores
  })
})
