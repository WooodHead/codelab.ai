import React from 'react'
import { iconData } from './Icon.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Icon',
  parameters: {
    data: {
      Default: iconData,
    },
  },
}

export const Default = () => {
  const Icon = Renderer.components(iconData)

  return <Icon />
}
