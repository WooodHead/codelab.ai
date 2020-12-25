import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindVertexBy } from '../../common/CommonTypes'
import { VertexRepositoryPort } from '../../core/adapters/VertexRepositoryPort'
import { Vertex } from '../../core/domain/vertex'
import { TypeOrmVertex } from '@codelab/backend'

@EntityRepository(TypeOrmVertex)
export class TypeOrmVertexRepositoryAdapter
  extends Repository<TypeOrmVertex>
  implements VertexRepositoryPort {
  async exists(searchBy: FindVertexBy): Promise<boolean> {
    const vertex = await this.findOne(searchBy.id)

    return !!vertex
  }

  async createVertex(vertex: Vertex): Promise<Vertex> {
    const typeOrmVertex = vertex.toPersistence()
    const newVertex = await this.save(typeOrmVertex)

    return Vertex.hydrate(newVertex)
  }

  async findAll(): Promise<Array<Vertex>> {
    const verticesTypeOrm: Array<TypeOrmVertex> = await this.find()
    const vertices = plainToClass(Vertex, verticesTypeOrm)

    return Promise.resolve(vertices)
  }

  async updateVertex(vertex: Vertex): Promise<Vertex> {
    const updatedVertex = await this.save({
      ...vertex.toPlain(),
    })

    return Vertex.hydrate(updatedVertex)
  }

  async findVertex(by: FindVertexBy): Promise<Option<Vertex>> {
    const typeOrmVertex = await this.findOne(by.id)

    return typeOrmVertex
      ? Promise.resolve(O.some(Vertex.hydrate(typeOrmVertex)))
      : O.none
  }

  // async findVertices(by: FindVertexBy): Promise<Array<Vertex>> {
  //   let typeOrmVertices: Array<TypeOrmVertex>
  //   let vertices
  //   let error = ''

  //   if (isGraphId(by)) {
  //     typeOrmVertices = await this.find({ where: { graph_id: by.graph_id } })
  //     vertices = plainToClass(Vertex, typeOrmVertices)

  //     return Promise.resolve(vertices)
  //   }

  //   error = 'Only can search by graph id'

  //   return Promise.reject(error)
  // }

  async deleteVertex(vertex: Vertex): Promise<Option<Vertex>> {
    const typeOrmVertex = vertex.toPersistence()
    const vertices = await this.remove([typeOrmVertex])

    return vertices.length > 0
      ? Promise.resolve(O.some(Vertex.hydrate(vertices[0])))
      : O.none
  }
}
