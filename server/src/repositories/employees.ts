import { prisma } from "@/prismaClient"

export const saveEmployee = async ({
  name,
  roleId,
  image_url,
} : {
  name: string
  roleId: number
  image_url: string
}) => {
  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new Error(`Role with id ${roleId} not found`);
    }
    return await prisma.employee.create({
      data: {
        name: name,
        role_id: role.id,
        image_url: image_url
      }
    })
  } catch (error) {
    console.error('Error creating employee', error)
  } finally {
    await prisma.$disconnect()
  }
}

export const getEmployees = async () => {
  try {
    return await prisma.employee.findMany({
      include: {
        role: true
      }
    })
  } catch (error) {
    console.error('Error pulling all employee', error)
  } finally {
    await prisma.$disconnect()
  }
}

export const deleteEmployee = async ({
  id
}: {
  id: Number
}) => {
  try {
    return await prisma.employee.delete({
      where: {
        id: parseInt(`${id}`),
      }
    })
  } catch (error) {
    console.error('Error pulling all employee', error)
  } finally {
    await prisma.$disconnect()
  }
}