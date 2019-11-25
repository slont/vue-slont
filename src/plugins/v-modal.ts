import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import VModal from '@/components/modals/VModal.vue'

Vue.prototype.$modal = (propsData: any) => {
  const ModalComponent = Vue.extend(VModal)
  return new ModalComponent({
    propsData,
    router,
    store,
    el: document.createElement('div')
  })
}
