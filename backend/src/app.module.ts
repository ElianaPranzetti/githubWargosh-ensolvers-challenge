import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { RDS_HOSTNAME, RDS_PORT, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME } from "./config";
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: RDS_HOSTNAME,
      port: parseInt(RDS_PORT),
      username: RDS_USERNAME,
      password: RDS_PASSWORD,
      database: RDS_DB_NAME,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, // set to false in production
    }),
    TasksModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
