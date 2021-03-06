import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace PageHeader {
  export const propKeys = [
    'title',
    'subTitle',
    'ghost',
    'avatar',
    'backIcon',
    'tags',
    'extra',
    'breadcrumb',
    'footer',
    'onBack',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
