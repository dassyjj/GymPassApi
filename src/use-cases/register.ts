// import { prisma } from "@/lib/prisma"
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists'
import type { User } from '@prisma/client'

// import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID

// D - Dependency Inversion Principle

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
