import { Role } from "./roles";

export type Employee = {
  [x: string]: any;
  id: number;
  name: string;
  image_url: string;
  role: Role;
}