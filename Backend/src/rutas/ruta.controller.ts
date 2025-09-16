import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutaService } from './ruta.service';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { exitCode } from 'process';

@Controller('ruta')
export class RutaController {
  this: any;
  constructor(private readonly rutaService: RutaService) {}

  @Post()
  create(@Body() body:any) {
    return this.rutaService.create(body);
  }

  @Get()
  findAll() {
    return this.rutaService.findAll(
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, 
        @Body() body:any) {
    return {
      "exito" : true,
      "mensaje" : "Actualizado correctamente ",
      "id" : id,
      "data": this.rutaService.update(+id, body)

    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutaService.remove(+id);
  }
}
