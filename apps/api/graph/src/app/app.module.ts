import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EdgeModule } from '../models/edge/edge.module'
import { GraphModule } from '../models/graph/graph.module'
import { UserModule } from '../models/user/user.module'
import { VertexModule } from '../models/vertex/vertex.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import {
  ConfigGraphqlHasuraService,
  ConfigModule,
  ConfigTypeormHasuraService,
} from '@codelab/api/providers/config'

@Module({
  imports: [
    // RouterModule,
    // LoggerModule,
    ConfigModule,
    // SeedDbModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: ConfigTypeormHasuraService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigGraphqlHasuraService,
      inject: [ConfigService],
    }),
    // Our models
    EdgeModule,
    VertexModule,
    GraphModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}