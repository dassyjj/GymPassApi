import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

// SOLID

// D - Dependency Inversion Principle

interface FetchNearbyGymsUseCaseReply {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseReply> {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

    return {
      gyms,
    }
  }
}
