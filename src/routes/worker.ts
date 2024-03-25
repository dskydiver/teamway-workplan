import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { createWorker, getAllWorker, getWorker } from '../controllers/worker'
import {
  CREATE_WORKER_SCHEMA,
  CreateWorkerRequestBody,
  GET_WORKER_PARAM_SCHEMA,
  GetWorkerParam,
} from '../schemas/worker'

const worker: FastifyPluginAsync = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/workers',
    handler: async (request, reply) => {
      await getAllWorker(request, reply)
    },
    schema: {
      tags: ['workers'],
    },
  })

  fastify.route({
    method: 'GET',
    url: '/workers/:id',
    handler: async (
      request: FastifyRequest<{ Params: GetWorkerParam }>,
      reply
    ) => {
      await getWorker(request, reply)
    },
    schema: {
      tags: ['workers'],
      params: GET_WORKER_PARAM_SCHEMA,
    },
  })

  fastify.route({
    method: 'POST',
    url: '/workers',
    handler: async (
      request: FastifyRequest<{ Body: CreateWorkerRequestBody }>,
      reply
    ) => {
      await createWorker(request, reply)
    },
    schema: {
      tags: ['workers'],
      body: CREATE_WORKER_SCHEMA,
    },
  })
}

export default worker
