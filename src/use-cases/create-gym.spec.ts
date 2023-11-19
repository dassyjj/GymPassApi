import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

// sut - system under test

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'test',
      description: null,
      phone: null,
      latitude: -23.5208704,
      longitude: -46.585077,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
