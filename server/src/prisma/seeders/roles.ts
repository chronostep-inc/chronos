import { PrismaClient } from "@prisma/client"

export default async function roles(prisma: PrismaClient) {
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Chief Executive Officer', type: 1 },
      { id: 2, name: 'Chief Technology Officer', type: 2 },
      { id: 3, name: 'Chief Operating Officer', type: 23 },
      { id: 4, name: 'Head Office Manager', type: 3 },
      { id: 5, name: 'Quality Assurance Engineer', type: 4 },
      { id: 6, name: 'Senior Engineer', type: 5 },
      { id: 7, name: 'Software Engineer', type: 6 },
    ],
    skipDuplicates: true,
  })
}