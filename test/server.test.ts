import { test } from 'tap'
import { build } from '../src/server'

test('/', async (t) => {
  const app = await build()

  const response = await app.inject({
    method: 'GET',
    url: '/',
  })

  t.equal(response.statusCode, 200, 'returns status code 200')
  t.equal(
    response.body,
    JSON.stringify({
      success: true,
      message: 'Welcome to the API',
    }),
    'returns welcome message'
  )
})

test('/workers', async (t) => {
  const app = await build()

  let response = await app.inject({
    method: 'GET',
    url: '/workers',
  })

  t.equal(response.statusCode, 200, 'returns status code 200')

  const id = JSON.parse(response.body).data[0].id
  response = await app.inject({
    method: 'GET',
    url: `/workers/${id}`,
  })
  t.equal(JSON.parse(response.body).data.id, id, 'returns worker by id')
})
