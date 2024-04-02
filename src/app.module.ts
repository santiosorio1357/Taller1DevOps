import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://santiosorio1357:nPkRxpI6nXP07Ejc@cluster0.wlupdfw.mongodb.net/dateapi?retryWrites=true&w=majority&appName=Cluster0'), TodoModule, UserModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
