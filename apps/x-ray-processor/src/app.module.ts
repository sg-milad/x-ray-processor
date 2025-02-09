import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from './configs/config.module.options';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ConfigModule.forRoot(ConfigModuleOptions()), ProducerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
