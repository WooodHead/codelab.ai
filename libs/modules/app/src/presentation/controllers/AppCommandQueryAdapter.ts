import { Injectable, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { classToPlain } from 'class-transformer'
import { isNone } from 'fp-ts/Option'
import { CreateAppCommand } from '../../core/application/commands/CreateAppCommand'
import { DeleteAppCommand } from '../../core/application/commands/DeleteAppCommand'
import { UpdateAppCommand } from '../../core/application/commands/UpdateAppCommand'
import { GetAppQuery } from '../../core/application/queries/GetAppQuery'
import { GetAppsQuery } from '../../core/application/queries/GetAppsQuery'
import { AppDto } from '../../core/application/useCases/AppDto'
import { CreateAppInput } from '../../core/application/useCases/createApp/CreateAppInput'
import { DeleteAppInput } from '../../core/application/useCases/deleteApp/DeleteAppInput'
import { GetAppInput } from '../../core/application/useCases/getApp/GetAppInput'
import { UpdateAppInput } from '../../core/application/useCases/updateApp/UpdateAppInput'
import { App } from '../../core/domain/app'
import {
  CommandQueryBusPort,
  CurrentUser,
  GqlAuthGuard,
  TypeOrmApp,
  UseCaseRequestPort,
} from '@codelab/backend'
import { User } from '@codelab/modules/user'

@Resolver(() => TypeOrmApp)
@Injectable()
export class AppCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  @Mutation(() => AppDto)
  @UseGuards(GqlAuthGuard)
  async createApp(
    @Args('input') input: CreateAppInput,
    @CurrentUser() user: User,
  ) {
    const results = await this.commandBus.execute(
      new CreateAppCommand({ ...input, user }),
    )

    return results.toPlain()
  }

  @Query(() => AppDto, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getApp(@Args('input') input: GetAppInput, @CurrentUser() user: User) {
    const results = await this.queryBus.execute(
      new GetAppQuery({ user, appId: input.appId }),
    )

    if (isNone(results)) {
      return null
    }

    return classToPlain(results.value)
  }

  @Query(() => [AppDto])
  @UseGuards(GqlAuthGuard)
  async getApps(@CurrentUser() user: User) {
    const results = await this.queryBus.execute(new GetAppsQuery({ user }))

    return classToPlain(results)
  }

  @Mutation(() => AppDto)
  @UseGuards(GqlAuthGuard)
  async updateApp(
    @Args('input') input: UpdateAppInput,
    @CurrentUser() user: User,
  ) {
    const app: App = await this.commandBus.execute(
      new UpdateAppCommand({
        user,
        ...input,
      }),
    )

    return app.toPlain()
  }

  @Mutation(() => AppDto)
  @UseGuards(GqlAuthGuard)
  async deleteApp(@Args('input') { id }: DeleteAppInput) {
    const result = await this.commandBus.execute(
      new DeleteAppCommand({ appId: id }),
    )

    return result.toPlain()
  }
}
