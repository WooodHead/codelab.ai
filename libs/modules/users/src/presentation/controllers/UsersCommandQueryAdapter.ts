import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DeleteUserCommand } from '../../core/application/commands/DeleteUserCommand'
import { LoginUserQuery } from '../../core/application/commands/LoginUserQuery'
import { RegisterUserCommand } from '../../core/application/commands/RegisterUserCommand'
import { UpdateUserCommand } from '../../core/application/commands/UpdateUserCommand'
import { GetUsersQuery } from '../../core/application/queries/GetUsersQuery'
import { UserUseCaseDto } from '../../core/application/useCases/UserUseCaseDto'
import { DeleteUserRequest } from '../../core/application/useCases/deleteUser/DeleteUserRequest'
import { GetUserRequest } from '../../core/application/useCases/getUser/GetUserRequest'
import { LoginUserRequest } from '../../core/application/useCases/loginUser/LoginUserRequest'
import { RegisterUserRequest } from '../../core/application/useCases/registerUser/RegisterUserRequest'
import { UpdateUserRequest } from '../../core/application/useCases/updateUser/UpdateUserRequest'
import { User } from '../../core/domain/user'
import {
  CommandQueryBusPort,
  TypeOrmUser,
  UseCaseRequestPort,
} from '@codelab/backend'

/**
 * An adapter for GraphQL User resolvers.
 *
 * @remarks
 * Converts a GraphQL resolver to a use case command or query
 *
 * @inheritDoc CommandQueryBusPort
 */
@Resolver(() => TypeOrmUser)
@Injectable()
export class UsersCommandQueryAdapter implements CommandQueryBusPort {
  constructor(
    readonly commandBus: CommandBus<UseCaseRequestPort>,
    readonly queryBus: QueryBus<UseCaseRequestPort>,
  ) {}

  // Use email as placeholder for now
  // @Query(() => [UserUseCaseDto])
  // async users(@Args('email') request: GetUserRequest) {
  //   const users = await this.queryBus.execute(new GetUsersQuery(request))

  //   return User.arrayToPlain(users)
  // }

  @Mutation((returns) => UserUseCaseDto)
  async deleteUser(@Args('user') request: DeleteUserRequest) {
    const user = await this.commandBus.execute(new DeleteUserCommand(request))

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async updateUser(@Args('user') request: UpdateUserRequest) {
    const user: User = await this.commandBus.execute(
      new UpdateUserCommand(request),
    )

    return user.toPlain()
  }

  @Mutation((returns) => UserUseCaseDto)
  async registerUser(@Args('request') request: RegisterUserRequest) {
    const user: User = await this.commandBus.execute(
      new RegisterUserCommand(request),
    )

    return user.toPlain()
  }

  @Query((returns) => UserUseCaseDto)
  async login(@Args('request') request: LoginUserRequest) {
    const result = await this.queryBus.execute(new LoginUserQuery(request))

    return result.toPlain()
  }
}