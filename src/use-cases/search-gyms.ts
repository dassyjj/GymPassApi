import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

// SOLID

// D - Dependency Inversion Principle

interface SearchGymsUseCaseReply {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseReply> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
