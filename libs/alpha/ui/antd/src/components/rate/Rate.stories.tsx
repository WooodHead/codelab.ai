import React from 'react'
import { rateData } from './Rate.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Rate',
  parameters: {
    data: {
      Default: rateData,
    },
  },
}

export const Default = () => {
  const Rate = Renderer.components(rateData)

  return <Rate />
}
