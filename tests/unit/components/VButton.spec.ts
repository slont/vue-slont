import {createLocalVue, shallowMount} from '@vue/test-utils'
import VButton from '@/components/VButton.vue'

const localVue = createLocalVue()

describe('VButton.vue', () => {
  const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec))

  it('default value check', () => {
    const wrapper = shallowMount(VButton)
    const vm: any = wrapper.vm
    expect(vm.disabled).toBe(false)
    expect(vm.processing).toBe(false)
    expect(vm.onclick).toBe(undefined)
    expect(vm.scopedProcessing).toBe(false)
  })

  describe('ボタンの非活性', () => {
    it('props.disabled', () => {
      const wrapper = shallowMount(VButton, {propsData: {disabled: true}})
      expect(wrapper.element.getAttribute('disabled')).toBeTruthy()
    })

    it('props.processing', () => {
      const wrapper = shallowMount(VButton, {propsData: {processing: true}})
      expect(wrapper.element.getAttribute('disabled')).toBeTruthy()
    })
  })

  describe('ボタンアクション', () => {
    let val = 0
    beforeEach(() => val = 0)

    it('押下時にonclickが発火する', async () => {
      const onclick = async () => val++
      const wrapper = shallowMount(VButton, {propsData: {onclick}})

      wrapper.trigger('click')
      expect(val).toBe(1)
      await localVue.nextTick()
      wrapper.trigger('click')
      expect(val).toBe(2)
      await localVue.nextTick()
      wrapper.trigger('click')
      expect(val).toBe(3)
    })

    it('押下後の処理中に再度クリックでonclickが発火しない', async () => {
      const onclick = async () => {
        await sleep(300)
        val++
      }
      const wrapper = shallowMount(VButton, {propsData: {onclick}})

      wrapper.trigger('click')
      expect(val).toBe(0)
      await localVue.nextTick()
      wrapper.trigger('click')
      expect(val).toBe(0)
      await localVue.nextTick()
      wrapper.trigger('click')
      expect(val).toBe(0)

      await sleep(300)
      expect(val).toBe(1)
    })

    it('disabled状態で押下時にonclickが発火しない', async () => {
      const onclick = () => val++
      const wrapper = shallowMount(VButton, {propsData: {disabled: true, onclick}})

      wrapper.trigger('click')
      expect(val).toBe(0)
      await localVue.nextTick()
      wrapper.trigger('click')
      expect(val).toBe(0)
    })
  })
})
