import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { GraphEntity } from '../graph/graph.entity'
import { IEdge } from './IEdge'

@Entity('edge')
@ObjectType({
  implements: [IEdge],
})
export class EdgeEntity {
  @PrimaryColumn()
  declare id: string

  @Column({
    type: 'text',
  })
  declare source: string

  @Column({
    type: 'text',
  })
  declare target: string

  @Column({
    type: 'jsonb',
  })
  declare props?: any

  @ManyToOne((type) => GraphEntity, (graph) => graph.edges)
  declare graph: GraphEntity
}