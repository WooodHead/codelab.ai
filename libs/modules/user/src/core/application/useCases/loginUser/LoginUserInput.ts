import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginUserInput {
  @Field()
  declare email: string

  @Field()
  declare password: string
}
