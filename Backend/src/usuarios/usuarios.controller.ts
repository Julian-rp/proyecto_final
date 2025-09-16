import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { exitCode } from 'process';

@Controller('usuarios')
export class UsuariosController {
  this: any;
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() body:any) {
    return this.usuariosService.create(body);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body:any) {
    return {
      "exito" : true,
      "mensaje" : "Actualizado correctamente ",
      "id" : id,
      "data": this.usuariosService.update(+id, body)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
