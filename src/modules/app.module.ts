import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CompaniesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env['DATABASE_TYPE'] as 'postgres',
      host: process.env['DATABASE_HOST'],
      port: Number(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSOWRD'],
      database: process.env['DATABASE_DB'],
      autoLoadEntities: Boolean(process.env['DATABASE_AUTOLOADENTITIES']),
      synchronize: Boolean(process.env['DATABASE_SYNCHRONIZE']),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
