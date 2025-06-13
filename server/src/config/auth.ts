export const expiresInMins = Number(process.env.JWT_EXPIRATION_MINS) || 2
export const secretKey = process.env.JWT_SECRET || 'secret-key'
export const cookieName = 'accessToken'
