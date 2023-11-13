import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

// sut - system under test

let UsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile use case', () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(UsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await UsersRepository.create({
      id: 'user-1',
      name: 'jonhdoe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      created_at: new Date(),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('jonhdoe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
