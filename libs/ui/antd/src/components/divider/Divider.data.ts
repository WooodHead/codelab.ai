import { Text } from '../text'
import { Divider } from './Divider.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const dividerData: NodeReactI<Divider.Props | Text.Props> = {
  type: 'React.Fragment',
  children: [
    {
      type: 'React.Html.p',
      children: [
        {
          type: 'React.Text',
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
    {
      type: 'React.Divider',
      props: {
        orientation: 'center',
        type: 'React.horizontal',
      },
    },
    {
      type: 'React.Html.p',
      children: [
        {
          type: 'React.Text',
          props: {
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo',
          },
        },
      ],
    },
  ],
}