import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {ModalState, State} from '@/types'

const state: ModalState = {
  items: []
}

const getters: GetterTree<ModalState, State> = {
  isLast: state => (uid: number) => {
    return state.items.slice(-1)[0] === uid
  }
}

const mutations: MutationTree<ModalState> = {
  push(state, uid) {
    state.items.push(uid)
  },
  remove(state, uid) {
    state.items = state.items.filter((it: number) => it !== uid)
  }
}

const actions: ActionTree<ModalState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
