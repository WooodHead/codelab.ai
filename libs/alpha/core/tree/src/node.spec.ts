import { findNode } from './tree-factory'
import { NodeEntity } from '@codelab/alpha/core/node'
import { NodeType } from '@codelab/alpha/shared/interface/node'

describe('Node', () => {
  it('can add a child', () => {
    const parent = new NodeEntity({ id: 'parent', type: NodeType.Tree })
    const child = new NodeEntity({ id: 'child', type: NodeType.Tree })

    expect(parent.hasChildren()).toBeFalsy()

    parent.addChild(child)

    expect(parent.hasChildren()).toBeTruthy()

    const { children } = parent

    expect(children).toContain(child)
  })

  it('can add a second child', () => {
    const parent = new NodeEntity({ id: 'parent', type: NodeType.Tree })
    const child = new NodeEntity({ id: 'child', type: NodeType.Tree })
    const secondChild = new NodeEntity({
      id: 'secondChild',
      type: NodeType.Tree,
    })

    parent.addChild(child)
    parent.addChild(secondChild)

    const { children } = parent

    expect(children).toEqual([child, secondChild])
  })

  it('can find a node', () => {
    const parent = new NodeEntity({ id: 'parent', type: NodeType.Tree })
    const child = new NodeEntity({ id: 'child', type: NodeType.Tree })
    const secondChild = new NodeEntity({
      id: 'secondChild',
      type: NodeType.Tree,
    })
    const grandChild = new NodeEntity({ id: 'grandChild', type: NodeType.Tree })

    parent.addChild(child)
    parent.addChild(secondChild)
    secondChild.addChild(grandChild)

    const found = findNode(grandChild?.id, parent)

    expect(found).toBe(grandChild)
  })
})
