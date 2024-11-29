import { mount } from '@vue/test-utils'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import { describe, expect, it } from 'vitest'

describe('ChatBubble.vue', () => {
  it('shoud match snapshot', () => {
    const wrapper = mount(ChatBubble)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the message as mine', () => {
    const message = 'Hello, this is my message'
    const itsMine = true
    const wrapper = mount(ChatBubble, {
      props: {
        id: 1,
        message,
        itsMine,
        image: '',
      },
    })
    expect(wrapper.text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-300').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('renders the message as received', () => {
    const id = 1
    const message = 'No'
    const itsMine = false
    const image = ''
    const wrapper = mount(ChatBubble, {
      props: {
        id,
        message,
        itsMine,
        image,
      },
    })
    expect(wrapper.text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBe(false)
    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
  })

  it('renders the image when provided', () => {
    const id = 1
    const message = 'No'
    const itsMine = false
    const image = 'https://example.com/image.jpg'
    const wrapper = mount(ChatBubble, {
      props: {
        id,
        message,
        itsMine,
        image,
      },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
  })

  it('does not render the image when not provided', () => {
    const id = 1
    const message = 'No'
    const itsMine = false
    const image = ''
    const wrapper = mount(ChatBubble, {
      props: {
        id,
        message,
        itsMine,
        image,
      },
    })
    expect(wrapper.find('img').exists()).toBe(false)
  })
})
