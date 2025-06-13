import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

import { toast } from 'react-toastify'
import type { Login, UserWithToken } from '../../../server/src/types/user'
import type { ApiResponse } from '../../../server/src/interfaces/apiResponse'
import {
  authKey,
  authValue,
  addAuthKeyLocalStorage,
  getAuthKeyLocalStorage,
  removeAuthKeyLocalStorage,
} from '~/utils/authLocalStorage'

type AuthUser = {
  id: number
  is_admin: boolean
}

interface AuthContextType {
  authUser: AuthUser | null
  handleLogout: () => void
  login: (data: Login) => Promise<ApiResponse<UserWithToken> | undefined>
}

const AuthContext = createContext<AuthContextType>({
  authUser: null,
  handleLogout: () => {},
  login: async () => undefined,
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const isAuth = getAuthKeyLocalStorage()
    if (isAuth === 'true') {
      getAuthUser()
    }
  }, [])

  useEffect(() => {
    // If auth key manually removed in localStorage it will logout the current user
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === authKey && e.newValue !== authValue) {
        handleLogout()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const getAuthUser = async () => {
    try {
      const response = await fetch('/api/auth/user', {
        credentials: 'include',
      })

      const user: AuthUser = await response.json()

      if (response.ok) {
        setAuthUser(user)
      } else {
        removeAuthKeyLocalStorage()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const result = await response.json()

      if (response.ok) {
        removeAuthKeyLocalStorage()
        setAuthUser(null)
        toast.success(result.message, {
          position: 'top-center',
          autoClose: 1500, // 1.5 secs
        })
      } else {
        toast.error(result.message, {
          position: 'top-center',
          toastId: result.message,
          autoClose: 1500,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (data: Login) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result: ApiResponse<UserWithToken> = await response.json()

      if (!result.success) {
        toast.error(result.message, {
          position: 'top-center',
          toastId: result.message, // to prevent duplicate
          autoClose: 1500, // 1.5 secs
        })
      }

      if (result.data) {
        addAuthKeyLocalStorage()
        setAuthUser({
          id: result.data.user.id,
          is_admin: result.data.user.is_admin,
        })
        toast.success(result.message, {
          position: 'top-center',
          autoClose: 1500,
        })
      }

      return result
    } catch (error) {
      console.error(error)
    }
  }

  const value = {
    authUser,
    handleLogout,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return authContext
}

export default AuthProvider
