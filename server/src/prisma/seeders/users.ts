import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

export default async function users(prisma: PrismaClient) {
    const hashPassword = await bcrypt.hash('password', 10)

    await prisma.user.createMany({
      data: [
        { email: 'admin@chronostep.com', password: hashPassword, is_admin: true },
        { email: 'user@chronostep.com', password: hashPassword },
      ],
      skipDuplicates: true
    })
}