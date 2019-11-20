import {State, UserState} from './store'

declare module 'app' {
  export default interface App {
    version: string
  }
}

export {
  State,
  UserState
}
