import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {State} from '@/types'
import user from './modules/user'
import modal from './modules/modal'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {user, modal},
  plugins: [
    createPersistedState({
      key: 'app',
      paths: ['user'],
      storage: localStorage
    })
  ]
}

export default new Vuex.Store(store)
