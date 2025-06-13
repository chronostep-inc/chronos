import { Request } from 'express'
import { cookieName } from '@/config/auth'

export interface AuthRequest extends Request {
    cookies: {
        [cookieName]?:string
    },
    auth?: any
}
