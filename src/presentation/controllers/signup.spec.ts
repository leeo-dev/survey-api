import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-erro'
describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // suit under test
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
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
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400) // Compara o ponteiro do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword')) // Compara apenas os valores
  })
})
