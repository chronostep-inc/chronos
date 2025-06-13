/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { Employee } from '../../../server/src/interfaces/employee'
import { Role } from '../../../server/src/interfaces/roles'

interface AppContextType {
  groupedEmployees: Record<number, Employee[]>
  modalIsOpen: boolean
  roles: Role[]
  preview: string | null
  form: {
    name: string
    role: string
    photo: string
  }
  openModal: () => void
  closeModal: () => void
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDelete: (employeeId: number) => Promise<void>
  handlePreview: (employeeType: number, employeeId: number) => void
  openNewModal: () => void
  employeeIdToEdit: number | null
  selectedEmployee: Employee | null
}

const AppContext = createContext<AppContextType>({
  groupedEmployees: [],
  modalIsOpen: false,
  roles: [],
  preview: null,
  form: {
    name: '',
    role: '',
    photo: '',
  },
  openModal: () => {},
  closeModal: () => {},
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {},
  handleSubmit: async (e: React.FormEvent) => {},
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  handleDelete: async (employeeId: number) => {},
  handlePreview: (employeeType: number, employeeId: number) => {},
  openNewModal: () => {},
  employeeIdToEdit: null,
  selectedEmployee: null,
})

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [groupedEmployees, setGroupedEmployees] = useState<
    Record<number, Employee[]>
  >([])
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  )
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [roles, setRoles] = useState<Role[]>([])
  const [rolesCopy, setRolesCopy] = useState<Role[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    role: '',
    photo: '',
  })
  const openModal = () => setIsOpen(true)
  const openNewModal = () => {
    setEmployeeIdToEdit(null)
    setSelectedEmployee(null)
    setForm({
      name: '',
      role: '',
      photo: '',
    })
    setPreview(null)
    setIsOpen(true)
  }
  const closeModal = () => setIsOpen(false)

  const getEmployees = async () => {
    const response = await fetch('/api/employee', {
      method: 'GET',
    })
    return response.json()
  }

  const groupEmployeesFn = async () => {
    const employees = await getEmployees()
    const groupEmployees = employees.reduce(
      (acc: Record<number, Employee[]>, employee: Employee) => {
        let type = employee.role.type
        if (type === 23) {
          type = 2
        }

        if (!acc[type]) {
          acc[type] = []
        }

        acc[type].push(employee)
        return acc
      },
      {},
    )
    setGroupedEmployees(groupEmployees)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setForm({ ...form, photo: base64 })
        setPreview(base64) // If you want to show a preview
      }
      reader.readAsDataURL(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const saveChanges = async (bodyRequest: string) => {
    return await fetch('/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyRequest,
      credentials: 'include',
    })
  }

  const updateChanges = async (bodyRequest: string) => {
    return await fetch(`/api/employee/${employeeIdToEdit}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyRequest,
      credentials: 'include',
    })
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsProcessed(true)
      const bodyRequest = JSON.stringify({
        name: form.name,
        role_id: form.role,
        image_url: form.photo,
      })
      const response = employeeIdToEdit
        ? await updateChanges(bodyRequest)
        : await saveChanges(bodyRequest)
      const result = await response.json()
      setIsProcessed(false)
      setForm({
        name: '',
        role: '',
        photo: '',
      })
      setPreview(null)
      closeModal()
      toast(result.message)
    },
    [form],
  )

  const handleDelete = async (employeeId: number) => {
    setIsProcessed(true)
    const response = await fetch(`/api/employee/${employeeId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const result = await response.json()

    toast(result.message)
    setIsProcessed(false)
  }

  const fetchRoles = async () => {
    const response = await fetch('/api/roles')
    const result = await response.json()

    setRolesCopy(result)
  }

  const handlePreview = (employeeType: number, employeeId: number) => {
    const result = groupedEmployees[employeeType]
    const employeeInArray = result.filter(
      (item: Employee) => item.id === employeeId,
    )
    const employee = employeeInArray.length > 0 ? employeeInArray[0] : null
    if (employee) {
      setEmployeeIdToEdit(employeeId)
      setSelectedEmployee(employee)
      setForm((prevState) => ({
        ...prevState,
        name: employee.name,
        role: employee.role.id.toString(),
        photo: employee.image_url,
      }))
      openModal()
      setPreview(employee.image_url)
    }
  }

  useEffect(() => {
    groupEmployeesFn()
  }, [isProcessed])

  useEffect(() => {
    fetchRoles()
  }, [])

  useEffect(() => {
    if (rolesCopy) {
      let filteredRoles = rolesCopy
      if (groupedEmployees) {
        const employeeRoleIds = Object.values(groupedEmployees)
          .flat()
          .map((emp) => emp.role_id)

        filteredRoles = rolesCopy.filter((role) => {
          if (
            [
              'Chief Executive Officer',
              'Chief Technology Officer',
              'Chief Operating Officer',
            ].includes(role.name)
          ) {
            return !employeeRoleIds.includes(role.id)
          }
          return true // Keep other roles
        })
      }

      setRoles(filteredRoles)
    }
  }, [rolesCopy, groupedEmployees])

  const value: AppContextType = useMemo(() => {
    return {
      groupedEmployees,
      modalIsOpen,
      roles,
      preview,
      form,
      openModal,
      closeModal,
      handleChange,
      handleSubmit,
      handlePhotoChange,
      handleDelete,
      handlePreview,
      openNewModal,
      employeeIdToEdit,
      selectedEmployee,
    }
  }, [
    groupedEmployees,
    modalIsOpen,
    roles,
    preview,
    form,
    employeeIdToEdit,
    selectedEmployee,
  ])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const AppProvider = AppContextProvider
export const useAppContext = () =>
  useContext(AppContext) ?? new Error('Cant start appcontext')
