import { useActor, useMachine } from '@xstate/react'
import { atom, useRecoilValue } from 'recoil'
import { Machine, assign, spawn } from 'xstate'
import { createGridMachine } from '@codelab/modules/grid-stories'
import { layoutMachine } from '@codelab/modules/layout-stories'
import { createUserMachine } from '@codelab/modules/users-stories'

export const appMachine = Machine<any>({
  id: 'app',
  entry: assign({
    layout: () => spawn(layoutMachine, { sync: true }),
    user: () => spawn(createUserMachine(), { sync: false, autoForward: true }),
    grid: () => spawn(createGridMachine(), { sync: false, autoForward: true }),
  }),
  initial: 'idle',
  states: {
    idle: {
      on: {
        // ON_MODAL_CANCEL: {
        //   actions: () => {
        //     console.log('on modal cancel')
        //   },
        // },
        // ON_MODAL_OK: {
        //   actions: () => {
        //     console.log('on modal ok')
        //   },
        // },
      },
    },
  },
})

export const appMachineState = atom({
  key: 'appMachine',
  default: appMachine,
})

export const useLayoutActor = (): any => {
  const appAtom = useRecoilValue(appMachineState)
  const [appState] = useMachine(appAtom)
  const [state, send] = useActor(appState.context.layout)

  return {
    state,
    send,
  }
}