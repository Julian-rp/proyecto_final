import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(correo: string, contrasena: string) {
    // Buscar usuario por correo
    const usuario = await this.prisma.usuarios.findFirst({
      where: { Correo: correo },
      include: { empresa: true }
    });

    if (!usuario) {
      return {
        exito: false,
        mensaje: 'Usuario no encontrado'
      };
    }

    // Verificar contraseña (por ahora comparación directa)
    // En producción, deberías usar bcrypt para hashear las contraseñas
    if (usuario.contrasena !== contrasena) {
      return {
        exito: false,
        mensaje: 'Contraseña incorrecta'
      };
    }

    return {
      exito: true,
      mensaje: 'Login exitoso',
      usuario: usuario.Nom_completo,
      data: usuario
    };
  }

  async registrarEmpleado(empleadoData: {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    direccion: string;
    contrasena: string;
  }) {
    try {
      // Verificar si el correo ya existe
      const usuarioExistente = await this.prisma.usuarios.findFirst({
        where: { Correo: empleadoData.correo }
      });

      if (usuarioExistente) {
        return {
          exito: false,
          mensaje: 'El correo ya está registrado'
        };
      }

      // Crear el usuario
      const nuevoUsuario = await this.prisma.usuarios.create({
        data: {
          Tip_usuario: 'Empleado',
          Nom_completo: `${empleadoData.nombre} ${empleadoData.apellido}`,
          direccion: empleadoData.direccion,
          Correo: empleadoData.correo,
          Telefono: parseInt(empleadoData.telefono),
          contrasena: empleadoData.contrasena, // Guardar contraseña
          Id_empresa: 1 // Asignar a empresa por defecto, ajustar según necesidad
        }
      });

      return {
        exito: true,
        mensaje: 'Empleado registrado correctamente',
        data: nuevoUsuario
      };
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  async obtenerUsuarios() {
    return await this.prisma.usuarios.findMany({
      include: { empresa: true }
    });
  }
}
