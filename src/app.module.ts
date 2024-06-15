import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { PostController } from './post/infraestructure/controller/post-controller';
import { CQRSDatabaseProvider } from './common/infraestructure/provider/cqrs-db-provider';

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
    ...CQRSDatabaseProvider
  ],
})
export class AppModule {}
