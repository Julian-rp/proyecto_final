import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy  {
  private _usuarios: any;
  public get usuarios(): any {
    return this._usuarios;
  }
  public set usuarios(value: any) {
    this._usuarios = value;
  }
  private _ruta: any;
  public get ruta(): any {
    return this._ruta;
  }
  public set ruta(value: any) {
    this._ruta = value;
  }

 async onModuleInit() {
   await this.$connect();
 }

 async onModuleDestroy() {
   await this.$disconnect();
 }

}
