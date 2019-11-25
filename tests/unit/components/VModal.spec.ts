import {createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import modal from '@/store/modules/modal'
import VButton from '@/components/VButton.vue'
import VModal from '@/components/modals/VModal.vue'
import BasicModal from '@/components/modals/BasicModal.vue'

const localVue = createLocalVue()
const router = new VueRouter()
let store: any
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.component('VButton', VButton)

describe('VModal.vue', () => {
  beforeEach(() => {
    store = new Vuex.Store({modules: {modal}})
  })

  it('default value check', () => {
    const wrapper = mount(VModal, {
      localVue,
      propsData: {
        component: BasicModal,
        props: {
          title: 'BasicModal',
          message: 'test',
          okText: 'OK',
          onOk: async () => {},
          cancelText: 'Cancel'
        }
      },
      router,
      store
    })
  })
})
