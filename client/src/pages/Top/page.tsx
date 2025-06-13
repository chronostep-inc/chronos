import '@/css/Top.css'
import Header from '~/components/pages/Top/Header'
import Employees from '~/components/pages/Top/Employees'
import AddEditEmployee from '~/components/pages/Top/AddEditEmployee'
import { useAppContext } from '~/context/AppContextProvider'
import { useAuthContext } from '~/context/AuthContextProvider'

const Top = () => {
  const { groupedEmployees } = useAppContext()
  const { authUser } = useAuthContext()

  return (
    <div className='container mx-auto max-w-screen-xl p-4'>
      <Header />
      {authUser?.is_admin && <AddEditEmployee />}
      <Employees groupedEmployees={groupedEmployees} />
    </div>
  )
}

export default Top
