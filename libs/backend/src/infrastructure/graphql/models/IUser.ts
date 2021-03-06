import { Field, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export abstract class IUser {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare email: string

  // @Field(() => [TypeOrmGraph])
  // declare graphs: Array<TypeOrmGraph>
}
