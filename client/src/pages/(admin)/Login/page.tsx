import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type Login } from '../../../../../server/src/types/user'
import { useState } from 'react'
import { PiEye, PiEyeClosed } from 'react-icons/pi'
import { useAuthContext } from '~/context/AuthContextProvider'

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Login>({ resolver: zodResolver(loginSchema) })

  const isInputPassword = watch('password', '').length > 0
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const onSubmit = async (data: Login) => {
    try {
      const result = await login(data)

      if (result && result.success && result.data) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='bg-[hsl(0,_0%,_95%)] h-screen flex flex-col justify-center items-center gap-y-4'>
      <img src='/cs_logo_4.svg' className='h-24' alt='Chronostep Logo' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-105 py-6 px-10'
      >
        <div className='flex flex-col mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            {...register('email')}
            type='text'
            name='email'
            autoComplete='on'
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition duration-150'
          />
          {errors.email && (
            <span className='text-red-500 text-xs font-bold mt-1'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='flex flex-col mb-8'>
          <label htmlFor='password'>Password</label>
          <div className='relative'>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              name='password'
              autoComplete='off'
              className='w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition duration-150'
            />
            {isInputPassword && (
              <button
                onClick={toggleShowPassword}
                type='button'
                className='absolute inset-y-0 right-0 my-auto mr-2.5 md:cursor-pointer'
              >
                {showPassword ? <PiEye size={21} /> : <PiEyeClosed size={21} />}
              </button>
            )}
          </div>
          {errors.password && (
            <span className='text-red-500 text-xs font-bold mt-1'>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='flex justify-center items-center gap-x-8 px-4'>
          <NavLink to='/' className='w-full'>
            <button
              type='button'
              disabled={isSubmitting}
              className={`${isSubmitting ? 'bg-gray-400' : 'bg-gray-300'} w-full px-4 py-2 rounded-md hover:bg-gray-400 text-center md:cursor-pointer`}
            >
              Cancel
            </button>
          </NavLink>
          <button
            disabled={isSubmitting}
            type='submit'
            className={`${isSubmitting ? 'bg-sky-800' : 'bg-sky-600'} w-full hover:bg-sky-800 text-white rounded md:cursor-pointer px-3 py-2`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminLogin
