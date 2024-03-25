import { PrismaClient, ShiftTime } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const pickRandom = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)]

const pickRandomNDistinct = <T>(array: T[], n: number) =>
  [...new Set(array)].sort(() => Math.random() - 0.5).slice(0, n)

async function main() {
  const workersToCreate = 10 // Number of fake workers to create

  const workersData: { name: string; email: string }[] = []

  for (let i = 0; i < workersToCreate; i++) {
    const name = faker.person.fullName() // Generates a random name
    const email = faker.internet.email().toLowerCase() // Generates a random email address
    workersData.push({ name, email })
  }

  await prisma.worker.createMany({
    data: workersData,
  })

  // Optional: To create fake shifts for created workers
  // You could retrieve all workers, then loop through to create fake shifts per worker
  const workers = await prisma.worker.findMany({
    select: {
      id: true,
    },
  })

  const dates = Array.from({ length: 30 }, (_, i) => new Date(2024, 4, i + 1))

  const shiftsData: {
    workerId: string
    shiftDate: Date
    shiftTime: ShiftTime
  }[] = []

  for (const date of dates) {
    const randome_workers = pickRandomNDistinct(workers, 3)
    shiftsData.push({
      workerId: randome_workers[0].id,
      shiftDate: date,
      shiftTime: ShiftTime.First,
    })
    shiftsData.push({
      workerId: randome_workers[1].id,
      shiftDate: date,
      shiftTime: ShiftTime.Second,
    })
    shiftsData.push({
      workerId: randome_workers[2].id,
      shiftDate: date,
      shiftTime: ShiftTime.Third,
    })
  }

  await prisma.workerShift.createMany({
    data: shiftsData,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
