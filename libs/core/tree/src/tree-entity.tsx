import { Node } from '@codelab/shared/interface/node'
import { Tree } from '@codelab/shared/interface/tree'

export class TreeEntity implements Tree {
  current: Node

  root: Node

  constructor(root: Node) {
    this.root = root
    this.current = root
  }
}
