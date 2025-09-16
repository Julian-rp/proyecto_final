-- CreateTable
CREATE TABLE "ruta" (
    "Id_ruta" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Placas" TEXT NOT NULL,
    "Hora_Salida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Hora_Entrada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Id_usuario" INTEGER NOT NULL,
    CONSTRAINT "ruta_Id_usuario_fkey" FOREIGN KEY ("Id_usuario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "asesor_ruta" (
    "Id_asesor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Apellido" TEXT NOT NULL,
    "Telefono" INTEGER NOT NULL,
    "Id_ruta" INTEGER NOT NULL,
    CONSTRAINT "asesor_ruta_Id_ruta_fkey" FOREIGN KEY ("Id_ruta") REFERENCES "ruta" ("Id_ruta") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tip_usuario" TEXT NOT NULL,
    "Nom_completo" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "Correo" TEXT NOT NULL,
    "Telefono" INTEGER NOT NULL,
    "Id_empresa" INTEGER NOT NULL,
    CONSTRAINT "usuarios_Id_empresa_fkey" FOREIGN KEY ("Id_empresa") REFERENCES "empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "patrocinador" (
    "Id_patrocina" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Monto_pago" INTEGER NOT NULL,
    "Metodo_pago" TEXT NOT NULL,
    CONSTRAINT "patrocinador_Id_patrocina_fkey" FOREIGN KEY ("Id_patrocina") REFERENCES "empresa" ("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "empresa" (
    "id_empresa" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tip_empresa" TEXT NOT NULL,
    "Nom_empresa" TEXT NOT NULL,
    "Direccion" TEXT NOT NULL,
    "Correo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ruta_servicio" (
    "Id_ruta_servicio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Id_ruta" INTEGER NOT NULL,
    "Id_servicio" INTEGER NOT NULL,
    CONSTRAINT "ruta_servicio_Id_ruta_fkey" FOREIGN KEY ("Id_ruta") REFERENCES "ruta" ("Id_ruta") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ruta_servicio_Id_servicio_fkey" FOREIGN KEY ("Id_servicio") REFERENCES "servicio" ("Id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "servicio" (
    "Id_servicio" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Direccion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "parada" (
    "Id_parada" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Direccion" TEXT NOT NULL,
    "Barrio" TEXT NOT NULL,
    CONSTRAINT "parada_Id_parada_fkey" FOREIGN KEY ("Id_parada") REFERENCES "servicio" ("Id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE
);
