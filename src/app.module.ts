import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { PostController } from './post/infraestructure/controller/post-controller';
import { MongoDataBaseProvider } from './common/infraestructure/provider/nosql/mongo-db-provider';
import { PostgresDataBaseProvider } from './common/infraestructure/provider/sql/postgres-db-provider';

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
    MongoDataBaseProvider,
    PostgresDataBaseProvider
  ],
})
export class AppModule {}
