import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { correo: string; contrasena: string }) {
    try {
      const result = await this.authService.login(loginData.correo, loginData.contrasena);
      return result;
    } catch (error) {
      return {
        exito: false,
        mensaje: 'Error al iniciar sesión: ' + error.message
      };
    }
  }

  @Post('registro_empleado')
  async registrarEmpleado(@Body() empleadoData: {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    direccion: string;
    contrasena: string;
  }) {
    try {
      const result = await this.authService.registrarEmpleado(empleadoData);
      return result;
    } catch (error) {
      return {
        exito: false,
        mensaje: 'Error al registrar empleado: ' + error.message
      };
    }
  }

  @Get('usuarios')
  async obtenerUsuarios() {
    try {
      const usuarios = await this.authService.obtenerUsuarios();
      return usuarios; // Retornar directamente el array para el frontend
    } catch (error) {
      return {
        exito: false,
        mensaje: 'Error al obtener usuarios: ' + error.message
      };
    }
  }
}
