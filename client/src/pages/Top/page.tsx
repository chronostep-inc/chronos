import '@/css/Top.css'
import Header from '~/components/pages/Top/Header'
import Employees from '~/components/pages/Top/Employees'
import AddEmployee from '~/components/pages/Top/AddEmployee'
import { useAppContext } from '~/context/AppContextProvider'


const Top = () => {
  const {groupedEmployees} = useAppContext()

  return (
    <div className='container mx-auto max-w-screen-xl p-4'>
      <Header />
      <AddEmployee />
      <Employees groupedEmployees={groupedEmployees}/>
    </div>
  )
}

export default Top

