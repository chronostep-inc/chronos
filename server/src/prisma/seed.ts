import { prisma } from "@/prismaClient.ts"
import roles from "./seeders/roles.ts"
import users from "./seeders/users.ts"

const runSeeders = async () => {
  try {
    await roles(prisma)
    await users(prisma)
    console.log('All seeders ran successfully')    
  } catch (error) {
    console.error('Error running seeders', error)
  } finally {
    await prisma.$disconnect()
  }
}

runSeeders()
