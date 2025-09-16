import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RutaModule } from './rutas/ruta.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ServicioModule } from './servicio/servicio.module';
import { EmpresaModule } from './empresa/empresa.module';
import { AsesorRutaModule } from './asesor_ruta/asesor_ruta.module';
import { ParadaModule } from './parada/parada.module';
import { PatrocinadorModule } from './patrocinador/patrocinador.module';
import { RutaServicioModule } from './ruta_servicio/ruta_servicio.module';

@Module({
  imports: [RutaModule, PrismaModule, UsuariosModule, ServicioModule, EmpresaModule, AsesorRutaModule, ParadaModule, PatrocinadorModule, RutaServicioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
