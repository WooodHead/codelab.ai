import { EdgeA } from './edge'
import { VertexA } from './vertex'
import { EntityA, EntityI } from '@codelab/alpha/shared/interface/entity'
import { NodeA } from '@codelab/alpha/shared/interface/node'
import { D3GraphProps } from '@codelab/alpha/ui/d3'

export interface GraphI extends EntityI {
  label?: string
  vertices: Array<VertexA>
  edges: Array<EdgeA>
}

export interface GraphA extends EntityA {
  id: string
  label?: string
  vertices: Array<VertexA>
  edges: Array<EdgeA>
}

export interface IGraph {
  vertices: Array<VertexA>
  edges: Array<EdgeA>
  parent?: NodeA
  readonly d3Graph: D3GraphProps
  // addVertexFromNode(node: NodeA): void
  // addEdgeFromNodes(start: string, end: string): void
}
