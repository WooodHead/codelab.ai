import { Text } from '../text'
import { Anchor } from './Anchor.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const anchorData: NodeReactI<
  Anchor.Props | Anchor.LinkProps | Text.Props | { id: string }
> = {
  type: NodeType.React_Html_Div,
  children: [
    {
      type: NodeType.React_Anchor,
      props: {},
      children: [
        {
          type: NodeType.React_Anchor_Link,
          props: {
            href: '#1',
            title: '1',
          },
        },
        {
          type: NodeType.React_Anchor_Link,
          props: {
            href: '#2',
            title: '2',
          },
        },
        {
          type: NodeType.React_Anchor_Link,
          props: {
            href: '#3',
            title: '3',
          },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: { id: '1' },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [{ type: NodeType.React_Text, props: { value: '1' } }],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: { id: '2' },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [{ type: NodeType.React_Text, props: { value: '2' } }],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: { id: '3' },
      children: [
        {
          type: NodeType.React_Html_Div,
          props: { style: { fontSize: 30, fontWeight: 'bold' } },
          children: [{ type: NodeType.React_Text, props: { value: '3' } }],
        },
        {
          type: NodeType.React_Html_P,
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value:
                  ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a orci acdiam pharetra viverra sit amet eget arcu. Ut sit amet efficitur elit. Suspendisse pulvinar pulvinar lectus ac malesuada. Curabitur ac dictumelit. Nam lectus ex, suscipit nec aliquet vel, molestie sed justo. Nullam commodo dui viverra sem hendrerit, eget iaculis nisi commodo. Aliquam at mauris porta libero mattis convallis et posuere leo. Vivamus vehicula libero lacus, ac molestie mi varius eu. Nam vel libero odio. Nulla sollicitudin dignissim pellentesque. Praesent eleifend tortor ac dapibus efficitur. Nunc eleifend augue vel laoreet rutrum. Mauris eros lorem, tempus et dapibus sed, auctor sit amet turpis. Aenean in ex quis nisl dignissim consectetur. Vestibulum tristique, risus sed luctus egestas, nibh purus fringilla orci, at molestie sem dui a urna. Mauris eu risus gravida, pellentesque est vitae, finibus urna. Nulla non posuere leo. Curabitur nec feugiat nunc. In elementum sem tellus, eget tempus sapien imperdiet ac. ',
              },
            },
          ],
        },
      ],
    },
  ],
}
