import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { OrmDatabaseProvider } from './common/infraestructure/provider/orm-db-provider';
import { PostController } from './post/infraestructure/controller/post-controller';
import { OdmDataBaseProvider } from './common/infraestructure/provider/odm-db-provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '2h' }
    }),
  ],
  controllers: [
    PostController
  ],
  providers: [
    OrmDatabaseProvider,
    OdmDataBaseProvider
  ],
})
export class AppModule {}
