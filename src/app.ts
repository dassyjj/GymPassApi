import fastify from 'fastify'

export const app = fastify()

app.get('/', async (req, reply) => {
  return 'hello'
})