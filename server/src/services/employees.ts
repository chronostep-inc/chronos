import { deleteEmployee, getEmployees, saveEmployee } from "@/repositories/employees";
import { Router } from "express";

const router = Router()

router.get('/employee', async (request, response) => {
  try {
    const result = await getEmployees()
    response.json(result)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong in pulling employees." });
  }
})

router.post('/employee', async (request, response) => {
  try {
      const {name, role_id, image_url} = request.body
      const roles = await saveEmployee({
        name: name,
        roleId: parseInt(role_id),
        image_url: image_url
      })
      response.send(roles)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong in saving employee." });
  }
})

router.delete('/employee/:id', async (request, response) => {
  try {
      const {id} = request.params
      const employee = await deleteEmployee({
        id: parseInt(id)
      })
      response.send(employee)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong in saving employee." });
  }
})

export default router