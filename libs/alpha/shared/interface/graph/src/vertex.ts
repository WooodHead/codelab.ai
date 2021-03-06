import { NodeType } from '@codelab/alpha/shared/interface/node'

export type VertexProps = {
  id: string
}

export interface Vertex {
  id: string
}

export enum VertexType {
  REACT_BUTTON = 'REACT_BUTTON',
  REACT_TEXT = 'REACT_TEXT',
  REACT_AFFIX = 'REACT_AFFIX',
  REACT_ALERT = 'REACT_ALERT',
  REACT_ANCHOR = 'REACT_ANCHOR',
}

export interface DeleteVertexDTO {
  id: string
}

export interface CreateVertexDTO {
  type: NodeType
}
