import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

// sut - system under test

let UsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(UsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jonhdoe@example.com'

    await sut.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jonh Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
