import { EmailValidatorAdapter } from './email-validator'
describe('EmailValidator Adapter', () => {
  test('Should return false validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
