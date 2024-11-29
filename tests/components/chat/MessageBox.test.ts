import { mount } from '@vue/test-utils'
import MessageBox from '@/components/chat/MessageBox.vue'
import { describe, expect, it } from 'vitest'

describe('MessageBox.vue', () => {
  it('shoud match snapshot', () => {
    const wrapper = mount(MessageBox)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly', () => {
    const wrapper = mount(MessageBox)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button svg').exists()).toBe(true)
  })

  it('updates message data property when input changes', async () => {
    const wrapper = mount(MessageBox)
    await wrapper.find('input[type="text"]').setValue('Hola Mundo')
    expect((wrapper.vm as unknown as { message: string }).message).toBe(
      'Hola Mundo',
    )
  })

  it('calls sendMessage method when button is clicked', async () => {
    const wrapper = mount(MessageBox)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Hello?')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().sendMessage).toBeTruthy()
    expect(wrapper.emitted().sendMessage[0]).toEqual(['Hello?'])
  })

  it('emits sendMessage event with correct payload', async () => {
    const wrapper = mount(MessageBox)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Hello?')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().sendMessage).toBeTruthy()
    expect(wrapper.emitted().sendMessage[0]).toEqual(['Hello?'])
  })

  it('emits sendMessage event with correct payload when Enter key is pressed', async () => {
    const wrapper = mount(MessageBox)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Hello?')
    await input.trigger('keypress.enter')
    expect(wrapper.emitted().sendMessage).toBeTruthy()
    expect(wrapper.emitted().sendMessage[0]).toEqual(['Hello?'])
  })
})
