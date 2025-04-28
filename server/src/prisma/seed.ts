import { prisma } from "@/prismaClient.ts"
import roles from "./seeders/roles.ts"

const runSeeders = async () => {
  try {
    await roles(prisma)
    console.log('All seeders ran successfully')    
  } catch (error) {
    console.error('Error running seeders', error)
  } finally {
    await prisma.$disconnect()
  }
}

runSeeders()
