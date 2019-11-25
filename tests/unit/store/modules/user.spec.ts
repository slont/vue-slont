import {createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import user from '@/store/modules/user'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('user.ts', () => {
  let store: any

  beforeEach(() => {
    store = new Vuex.Store<any>(user)
  })

  it('initial value check', () => {
    expect(store.state.id).toBe('')
    expect(store.state.name).toBe('')
  })

  it('set method check', () => {
    store.commit('set', {id: 'hoge', name: 'fuga'})
    expect(store.state.id).toBe('hoge')
    expect(store.state.name).toBe('fuga')
  })
})
