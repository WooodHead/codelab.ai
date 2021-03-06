import { Switch } from './Switch.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const switchData: NodeReactI<Switch.Props> = {
  type: NodeType.React_Switch,
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
