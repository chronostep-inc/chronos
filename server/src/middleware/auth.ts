import { Request, Response, NextFunction } from 'express'
import { secretKey, cookieName, expiresInMins } from '@/config/auth'
import { AuthRequest } from '@/interfaces/customRequest'
import jwt from 'jsonwebtoken'

export const authJWT = (request: AuthRequest, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies.accessToken

        if (!token) {
            response.status(401).json({ message: 'Unauthenticated.' })
        } else {
            const decoded = jwt.verify(token, secretKey)

            // Assert the type of decoded user token into id and is_admin
            const user = decoded as { id: number, is_admin: boolean }

            // Store the decoded user into request.auth property
            request.auth = user

            // Refresh the token and the cookie if valid
            const payload = { id: user.id, is_admin: user.is_admin }
            const newToken = jwt.sign(payload, secretKey, {
                expiresIn: `${expiresInMins}m`
            })

            const expiresAt = new Date(Date.now() + expiresInMins * 60 * 1000)

            response.cookie(cookieName, newToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                expires: expiresAt
            })

            next()
        }
    } catch (error) {
        console.error(error)
        response.status(403).json({ message: 'Invalid token' })
    }
}
