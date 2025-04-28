import { getRoles } from "@/repositories/roles";
import { Router, Request, Response } from "express";

const router = Router();

router.get('/roles', async (req: Request, response: Response) => {
  try {
    const roles = await getRoles()
    response.json(roles)
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong." });
  }
})

export default router