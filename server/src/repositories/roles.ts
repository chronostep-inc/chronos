import { prisma } from "@/prismaClient";

export const getRoles = async () => {
  try {
    return await prisma.role.findMany();
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect()
  }
}