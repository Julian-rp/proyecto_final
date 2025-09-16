import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { exitCode } from 'process';

@Controller('empresa')
export class EmpresaController {
  this: any;
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() body: any) {
    return this.empresaService.create(body);
  }

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      "exito": true,
      "mensaje": "Actualizado correctamente",
      "id": id,
      "data": this.empresaService.update(+id, body)
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}