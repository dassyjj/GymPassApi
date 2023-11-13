import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

// sut - system under test

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-1',
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -23.5208704,
      longitude: -46.585077,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.5208704,
      userLongitude: -46.585077,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.5208704,
      userLongitude: -46.585077,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: -23.5208704,
        userLongitude: -46.585077,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.5208704,
      userLongitude: -46.585077,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: -23.5208704,
      userLongitude: -46.585077,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-2',
      title: 'gym-2',
      description: null,
      phone: null,
      latitude: -23.5552694,
      longitude: -46.8444955,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -23.5208704,
        userLongitude: -46.585077,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
