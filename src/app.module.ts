import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CompteModule } from './compte/compte.module';
import { Compte } from './compte/entities/compte.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: 'jimik',
      password: 'jimik2007life',
      database: "nest_typeorm_messagerie",
      entities: [User, Compte, Post],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    CompteModule,
    PostsModule,    
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
