import { fastifySwagger, SwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod2'
import prisma from '../database'
import worker from './routes/worker'
import shift from './routes/shift'

const server = fastify().withTypeProvider<ZodTypeProvider>()

const start = async () => {
  try {
    dotenv.config()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    const swaggerOptions: SwaggerOptions = {
      swagger: {
        info: {
          title: 'API Documentation',
          description: 'API documentation for your Fastify application.',
          version: '1.0.0',
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
          BearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
      transform: jsonSchemaTransform,
    }

    const swaggerUiOptions = {
      routePrefix: 'documentation',
      exposeRoute: true,
    }

    // Register the Swagger plugin
    server.register(fastifySwagger, swaggerOptions)

    server.register(fastifySwaggerUI, swaggerUiOptions)

    server.register(worker)
    server.register(shift)

    server.get('/', (req, reply) => {
      reply.send({ success: true, message: 'Welcome to the API' })
    })

    // if route not found
    server.setNotFoundHandler((request, reply) => {
      reply.code(404).send({ success: false, message: 'Route not found' })
    })

    if (process.env.DEPLOY_ENV === 'production') {
      server.setErrorHandler((error, request, reply) => {
        console.log(error)
        if (error.code === 'FST_ERR_VALIDATION') {
          reply.status(400).send({
            error: 'Bad Request',
            message: 'Invalid request parameters',
          })
        } else {
          reply.send(error)
        }
      })
    }

    process.on('unhandledRejection', function (reason: any, promise: any) {
      console.log(
        'unhandledRejection ' +
          promise.toString() +
          ' stack ' +
          JSON.stringify(reason.stack)
      )
    })

    const portDetail: number = Number(process.env.PORT) || 5000

    await server.listen({ port: portDetail })
    console.log('server running on port ', portDetail)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

// Graceful Shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`* Received signal: ${signal} *`)
  console.log('Closing fastify server...')
  await server.close()

  // Here you'd also handle your database disconnection, if needed.
  await prisma.$disconnect()

  console.log('Server successfully closed')
  process.exit(0)
}

// Handling termination and interrupt signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

start()
