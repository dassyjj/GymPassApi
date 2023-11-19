import type { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchMemberCheckInsUseCaseRequest {
  userId: string
  page: number
}

interface FetchMemberCheckInsUseCaseReply {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMemberCheckInsUseCaseRequest): Promise<FetchMemberCheckInsUseCaseReply> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
