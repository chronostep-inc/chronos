import 'tsconfig-paths/register';
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors'
import { prisma } from '@/prismaClient';
import rolesServices from '@/services/roles'
import employeServices from '@/services/employees'

dotenv.config();

const app = express()

// Access environment variables
const port = process.env.PORT || 5000;
const routePrefix = '/api/'

// Middleware to parse JSON bodies
app.use(express.json());

// For cors policy issue
app.use(cors())

app.use(`${routePrefix}`, rolesServices)
app.use(`${routePrefix}`, employeServices)


app.listen(port, () => {console.log("server is starting on port 5000")})

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});