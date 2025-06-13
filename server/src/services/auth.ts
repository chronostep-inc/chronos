import { getUser } from "@/repositories/user";
import { Router } from "express";
import { loginSchema } from "@/types/user";
import { authJWT } from "@/middleware/auth";
import { secretKey, cookieName, expiresInMins } from '@/config/auth'
import { AuthRequest } from "@/interfaces/customRequest";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', async (request, response) => {
    try {
        // Validation
        const result = loginSchema.safeParse(request.body)

        if (!result.success) {
            const validationErrors = result.error.flatten().fieldErrors
            response.status(400).json(validationErrors)
            return
        }
        
        const user = await getUser({ email: result.data.email })
        const hashPassword = user?.password ?? ''
        const exactPassword = await bcrypt.compare(result.data.password, hashPassword)

        if (!user || !exactPassword) {
            response.status(401).json({
                success:false,
                message: 'Invalid credentials'
            })
            return
        }

        const payload = { id: user.id, is_admin: user.is_admin }

        const token = jwt.sign(payload, secretKey, {
            expiresIn: `${expiresInMins}m`
        })

        const expiresAt = new Date(Date.now() + expiresInMins * 60 * 1000)

        // Store the token in http-only cookie
        response.cookie(cookieName, token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            expires: expiresAt
        })

        response.json({
            success: true,
            data: {
                user: payload,
                accessToken: token
            },
            message: 'Login successfully!'
        })
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Something went wrong from logging in.' })
    }
})

router.get('/auth/user', authJWT, async (request: AuthRequest, response) => {
    try {
        const authUser = request.auth
        response.json(authUser)
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Failed to get auth user' })
    }
})

router.post('/auth/logout', authJWT, async (request, response) => {
    try {
        response.clearCookie(cookieName, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        response.json({ message: 'Logout successfully!' })
    } catch (error) {
        console.error(error)
        response.status(500).json({ message: 'Failed to logout' })
    }
})

export default router