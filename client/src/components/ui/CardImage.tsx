import { useAppContext } from "~/context/AppContextProvider";
import { Employee } from "../../../../server/src/interfaces/employee"
import { FaTrashAlt } from "react-icons/fa"; 


const CardImage = ({employee}:{employee: Employee}) => {
  const {handleDelete} = useAppContext()
  
  return (
    <div className='relative flex flex-col items-center text-center whitespace-nowrap'>
      {/* Floating Delete Icon */}
      <button
        onClick={() => handleDelete(employee.id)}
        className="cursor-pointer absolute top-0 right-0 p-1 bg-white rounded-full border border-gray-300 shadow-lg hover:bg-gray-200 focus:outline-none"
      >
        <FaTrashAlt className="text-red-500" />
      </button>

      <img src={employee.image_url} alt={employee.name} className='w-20 h-20 rounded-full object-cover border border-gray-500' />
      <h4 className='mt-2 bold'>{employee.name}</h4>
      <span className='text-sm'>{employee.role.name}</span>
    </div>
  )
}

export default CardImage