import prisma from '../database'
import logger from '../logger'
import { server, start } from './server'

// Graceful Shutdown
const gracefulShutdown = async (signal: string) => {
  logger.info(`* Received signal: ${signal} *`)
  logger.info('Closing fastify server...')
  await server.close()

  // Here you'd also handle your database disconnection, if needed.
  await prisma.$disconnect()

  logger.info('Server successfully closed')
  process.exit(0)
}

// Handling termination and interrupt signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

start()
