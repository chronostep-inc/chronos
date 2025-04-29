import { Employee } from "../../../../../server/mock-data"
import CardImage from "~/components/ui/CardImage"



const Employees = ({groupedEmployees}: {
  groupedEmployees: Record<number, Employee[]>
}) => {
  return (
    <div className='flex flex-col items-center space-y-8 p-10 text-white'>
    {
      Object.entries(groupedEmployees).map(([type, employees]) => {
        const index = Number(type)
        let className = 'flex justify-center'

        switch (index) {
          case 1:
          case 3:
            className = 'flex justify-center'
            break;
          case 2:
          case 4:
            className = 'flex justify-center space-x-20'
            break;
          case 5:
            className = 'grid grid-cols-2 gap-10 sm:grid-cols-5 justify-center'
            break;
          case 6:
            className = 'grid grid-cols-2 gap-10 sm:grid-cols-7 justify-center'
            break;
        
          default:
            className = 'flex justify-center'
            break;
        }
        
        return (
          <div key={`${index}-${employees.length}`} className={className}>
            {employees.map((employee: Employee) => (
              <CardImage key={employee.id} employee={employee} type={index}/>
            ))}
          </div>
        )
      })
    }
  </div>
  )
}

export default Employees