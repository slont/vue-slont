import {State, UserState, ModalState} from './store'

declare module 'app' {
  export default interface App {
    $store: any
    version: string
  }
}

export {
  State,
  UserState,
  ModalState
}
