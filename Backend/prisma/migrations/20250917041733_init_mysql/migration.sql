/*
  Warnings:

  - You are about to alter the column `Direccion` on the `parada` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `Direccion` on the `servicio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `contrasena` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Made the column `Telefono` on table `asesor_ruta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_ruta` on table `asesor_ruta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Direccion` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Correo` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Barrio` on table `parada` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_servicio` on table `parada` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Metodo_pago` on table `patrocinador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_empresa` on table `patrocinador` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_usuario` on table `ruta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_ruta` on table `ruta_servicio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_servicio` on table `ruta_servicio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Telefono` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Id_empresa` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `asesor_ruta` DROP FOREIGN KEY `asesor_ruta_Id_ruta_fkey`;

-- DropForeignKey
ALTER TABLE `parada` DROP FOREIGN KEY `parada_Id_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `patrocinador` DROP FOREIGN KEY `patrocinador_Id_empresa_fkey`;

-- DropForeignKey
ALTER TABLE `ruta` DROP FOREIGN KEY `ruta_Id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `ruta_servicio` DROP FOREIGN KEY `ruta_servicio_Id_ruta_fkey`;

-- DropForeignKey
ALTER TABLE `ruta_servicio` DROP FOREIGN KEY `ruta_servicio_Id_servicio_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_Id_empresa_fkey`;

-- DropIndex
DROP INDEX `asesor_ruta_Id_ruta_fkey` ON `asesor_ruta`;

-- DropIndex
DROP INDEX `parada_Id_servicio_fkey` ON `parada`;

-- DropIndex
DROP INDEX `patrocinador_Id_empresa_fkey` ON `patrocinador`;

-- DropIndex
DROP INDEX `ruta_Id_usuario_fkey` ON `ruta`;

-- DropIndex
DROP INDEX `ruta_servicio_Id_ruta_fkey` ON `ruta_servicio`;

-- DropIndex
DROP INDEX `ruta_servicio_Id_servicio_fkey` ON `ruta_servicio`;

-- DropIndex
DROP INDEX `usuarios_Id_empresa_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `asesor_ruta` MODIFY `Nombre` VARCHAR(191) NOT NULL,
    MODIFY `Apellido` VARCHAR(191) NOT NULL,
    MODIFY `Telefono` INTEGER NOT NULL,
    MODIFY `Id_ruta` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `empresa` MODIFY `Tip_empresa` VARCHAR(191) NOT NULL,
    MODIFY `Nom_empresa` VARCHAR(191) NOT NULL,
    MODIFY `Direccion` VARCHAR(191) NOT NULL,
    MODIFY `Correo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `parada` MODIFY `Direccion` VARCHAR(191) NOT NULL,
    MODIFY `Barrio` VARCHAR(191) NOT NULL,
    MODIFY `Id_servicio` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patrocinador` MODIFY `Nombre` VARCHAR(191) NOT NULL,
    MODIFY `Metodo_pago` VARCHAR(191) NOT NULL,
    MODIFY `Id_empresa` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ruta` MODIFY `Placas` VARCHAR(191) NOT NULL,
    MODIFY `Id_usuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ruta_servicio` MODIFY `Id_ruta` INTEGER NOT NULL,
    MODIFY `Id_servicio` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicio` MODIFY `Direccion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `Tip_usuario` VARCHAR(191) NOT NULL,
    MODIFY `Nom_completo` VARCHAR(191) NOT NULL,
    MODIFY `direccion` VARCHAR(191) NOT NULL,
    MODIFY `Correo` VARCHAR(191) NOT NULL,
    MODIFY `Telefono` INTEGER NOT NULL,
    MODIFY `contrasena` VARCHAR(191) NOT NULL,
    MODIFY `Id_empresa` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ruta` ADD CONSTRAINT `ruta_Id_usuario_fkey` FOREIGN KEY (`Id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asesor_ruta` ADD CONSTRAINT `asesor_ruta_Id_ruta_fkey` FOREIGN KEY (`Id_ruta`) REFERENCES `ruta`(`Id_ruta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_Id_empresa_fkey` FOREIGN KEY (`Id_empresa`) REFERENCES `empresa`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patrocinador` ADD CONSTRAINT `patrocinador_Id_empresa_fkey` FOREIGN KEY (`Id_empresa`) REFERENCES `empresa`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruta_servicio` ADD CONSTRAINT `ruta_servicio_Id_ruta_fkey` FOREIGN KEY (`Id_ruta`) REFERENCES `ruta`(`Id_ruta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruta_servicio` ADD CONSTRAINT `ruta_servicio_Id_servicio_fkey` FOREIGN KEY (`Id_servicio`) REFERENCES `servicio`(`Id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parada` ADD CONSTRAINT `parada_Id_servicio_fkey` FOREIGN KEY (`Id_servicio`) REFERENCES `servicio`(`Id_servicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
