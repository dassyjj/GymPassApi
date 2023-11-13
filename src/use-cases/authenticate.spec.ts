import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// sut - system under test

let UsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(UsersRepository)
  })

  it('should be able to authenticate', async () => {
    await UsersRepository.create({
      id: 'user-1',
      name: 'jonhdoe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    const { user } = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate wrong password', async () => {
    await UsersRepository.create({
      id: 'user-1',
      name: 'jonhdoe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    await expect(() =>
      sut.execute({
        email: 'jonhdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
