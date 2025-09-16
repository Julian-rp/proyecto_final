import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class EmpresaService {

  constructor(
    private prisma: PrismaService 
  ) {}

  create(body: any) {
    return this.prisma.empresa.create({
      data: body
    })
  }

  findAll() {
    return this.prisma.empresa.findMany({
      orderBy: [{id_empresa: 'asc' }]
    })
  }

  findOne(id: number) {
    return this.prisma.empresa.findFirst({
      where: { id_empresa: id }
    }) 
  }

  async update(id: number, body: any) {
    return await this.prisma.empresa.update({
      where: { id_empresa: id },
      data: body
    });
  }

  async remove(id: number) {
    await this.prisma.empresa.delete({
      where: { id_empresa: id }
    })
    return {
      "exito": true,
      "mensaje": "Eliminado correctamente",
      "id": id
    }
  }
}
