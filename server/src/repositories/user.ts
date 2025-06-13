import { prisma } from "@/prismaClient"

export const getUser = async ({ email }: { email: string }) => {
    try {
        return await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                email: true,
                password: true,
                is_admin: true
            }
        })
    } catch (error) {
        console.error('Error getting user', error)
    } finally {
        await prisma.$disconnect()
    }
}
