import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {ModalState, State} from '@/types'

const state: ModalState = {
  modals: []
}

const getters: GetterTree<ModalState, State> = {
  isLast: state => (uid: number) => {
    return state.modals.slice(-1)[0] === uid
  }
}

const mutations: MutationTree<ModalState> = {
  push(state, uid) {
    state.modals.push(uid)
  },
  remove(state, uid) {
    state.modals = state.modals.filter((it: number) => it !== uid)
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
