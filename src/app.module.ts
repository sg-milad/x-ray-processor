import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './configs/config.module.options';

@Module({
  imports: [ConfigModule.forRoot(ConfigModuleOptions()),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
