import { Injectable } from '@nestjs/common';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RutaService {

  constructor(
    private prisma: PrismaService 
  ) {}

  create(body: any) {
    return this.prisma.ruta.create({
      data: body
    })
  }

  findAll() {
    return this.prisma.ruta.findMany({
      orderBy: [{Id_ruta: 'asc'}]
    })
  }

  findOne(id: number) {
    return this.prisma.ruta.findFirst({
      where:{Id_ruta:id}
    }) 
  }

  async update(id: number, 
          body: any){
    return await this.prisma.ruta.update({
      where: {Id_ruta: id},
      data: body
    });
  }

  async remove(id: number) {
    await this.prisma.ruta.delete({
      where: {Id_ruta: id}
    })
    return{
      "exito" : true,
      "mensaje" : "Eliminado correctamente ",
      "id" : id 
    }
  }
}
