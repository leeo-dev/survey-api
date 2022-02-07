import { SignUpController } from './signup'
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
    expect(httpResponse.body).toEqual(new Error('Missing param: name')) // Compara apenas os valores
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
    expect(httpResponse.body).toEqual(new Error('Missing param: email')) // Compara apenas os valores
  })
})
