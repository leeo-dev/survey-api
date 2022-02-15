import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({ async hash (): Promise<string> { return await Promise.resolve('hashed_value') } }))

const salt = 12
const makeSut = (): any => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })
  test('Should throw if bcrypt throw', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => await Promise.reject(new Error()))
    const hash = sut.encrypt('any_value')
    await expect(hash).rejects.toThrow()
  })
})
