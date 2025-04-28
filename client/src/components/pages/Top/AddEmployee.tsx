/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal from 'react-modal'
import { useAppContext } from '~/context/AppContextProvider'
import { Role } from '../../../../../server/src/interfaces/roles'

const AddEmployee = () => {
  const {
    modalIsOpen,
    roles,
    preview,
    form,
    openModal,
    closeModal,
    handleChange,
    handleSubmit,
    handlePhotoChange,
  } = useAppContext()
  return (
    <>
      <div className='relative flex justify-center mt-5'>
        <button
          onClick={openModal}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Add new employee
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Employee Form'
        className='max-w-lg w-2xl mx-auto mt-24 bg-white rounded shadow-lg p-6'
        overlayClassName='fixed inset-0 bg-[#4d4b4bb3] flex justify-center items-start pt-20 z-50'
      >
        <h2 className='text-2xl font-semibold mb-4'>Employee Form</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='font-semibold block mb-1'>Upload Photo</label>
            <input
              type='file'
              accept='image/jpg, image/jpeg'
              onChange={handlePhotoChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {preview && (
              <img
                src={preview}
                alt='Preview'
                className='mt-2 h-24 w-24 object-cover rounded border'
              />
            )}
          </div>
          <div className='mb-4'>
            <label className='font-semibold block mb-1'>Name</label>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='font-semibold block mb-1'>Role</label>
            <select
              name='role'
              value={form.role}
              onChange={handleChange}
              required
              className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value='' defaultValue='' selected disabled>
                Please select role
              </option>
              {roles.map((role: Role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={closeModal}
              className='px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
            >
              Close
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700'
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddEmployee
