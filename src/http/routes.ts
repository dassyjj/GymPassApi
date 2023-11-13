import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.constroller'
import { authenticate } from './controllers/authenticate.constroller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
