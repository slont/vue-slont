import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {State} from '@/types'
import user from './modules/user'

Vue.use(Vuex)

const store: StoreOptions<State> = {
  state: {},
  mutations: {},
  actions: {},
  modules: {user},
  plugins: [
    createPersistedState({
      key: 'app',
      paths: ['user'],
      storage: localStorage
    })
  ]
}

export default new Vuex.Store(store)
