import { Injectable, Body } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/usuarios/dto/update-usuario.dto';  
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {

  constructor(
    private prisma: PrismaService 
  ) {}

  create(body:any) {
    return this.prisma.usuarios.create({
      data: body
    });
  }

  findAll() {
    return this.prisma.usuarios.findMany({
      data: Body
    });
  }

  findOne(id: number) {
    return this.prisma.usuarios.findFirst({
      where:{id_usuario:id}
    });
  }

  async update(id: number, 
          body: any) {
    return await this.prisma.usuarios.update({
      where: {id_usuario: id},
      data: body
    });
  }

  async remove(id: number) {
    await this.prisma.usuarios.delete({
      where: {id_usuario: id}
    });
    return {
      "exito" : true,
      "mensaje" : "Eliminado correctamente ",
      "id" : id
    }
  }
}
