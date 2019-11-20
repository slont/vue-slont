import {GetterTree, MutationTree, ActionTree} from 'vuex'
import {UserState, State} from '@/types'

const state: UserState = {
  id: '',
  name: ''
}

const getters: GetterTree<UserState, State> = {
}

const mutations: MutationTree<UserState> = {
  set(s, user) {
    Object.assign(s, user)
  }
}

const actions: ActionTree<UserState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
