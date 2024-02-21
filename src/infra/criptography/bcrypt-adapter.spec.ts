import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return hashed password on success', async () => {
    const sut = makeSut()
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toEqual('hash')
  })
  test('Should return hashed password on success', async () => {
    const sut = makeSut()
    const hashedPassword = await sut.encrypt('any_value')
    expect(hashedPassword).toEqual('hash')
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => await new Promise((_resolve, reject) => reject(new Error()))
    )

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
