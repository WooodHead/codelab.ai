import { Renderer } from '@codelab/alpha/core/renderer'
import type { NodeReactI } from '@codelab/alpha/shared/interface/node'
import { NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

const nodeButtonGroupData: NodeReactI = {
  type: NodeType.React_Html_Div,
  children: [
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Current Selection: ' },
        },
        {
          type: NodeType.React_Text,
          props: {
            value: {
              __type: [PropType.Eval],
              value: 'return this.selectedNode',
            },
          },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: {
        style: {
          margin: '5px 0',
        },
      },
      children: [
        {
          type: NodeType.React_Button,
          props: {
            type: 'primary',
            onClick: {
              __type: [PropType.Eval],
              value: `
                return () => {
                  console.log(this);
                  this.openmodal()
                }
              `,
            },
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Show Create Node Form',
              },
            },
          ],
        },
      ],
    },
    {
      type: NodeType.React_Space,
      children: [
        // {
        //   type: NodeType.React_Button,
        //   props: {
        //     type: 'primary',
        //     onClick: {
        //       __type: ["Eval"],
        //       value: `return () => {
        //         console.log(this.props)
        //         this.props.handledelete.value()
        //       }`,
        //     },
        //   },
        //   children: [
        //     {
        //       type: NodeType.React_Text,
        //       props: {
        //         value: 'Delete Selected Node',
        //       },
        //     },
        //   ],
        // },
        {
          type: NodeType.React_Button,
          props: {
            type: 'primary',
            onClick: {
              __type: [PropType.Eval],
              value: `return () => this.clearfilter()`,
            },
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Clear ID filter',
              },
            },
          ],
        },
      ],
    },
  ],
}

export type ButtonGroupProps = {
  openmodal: Function
  handledelete: Function
  selectedNode: any
  clearfilter: Function
}

export const ButtonGroup = Renderer.components<ButtonGroupProps>(
  nodeButtonGroupData,
)
