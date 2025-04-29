/*
  Warnings:

  - A unique constraint covering the columns `[name,role_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_role_id_key" ON "Employee"("name", "role_id");
