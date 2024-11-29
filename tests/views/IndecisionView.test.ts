import { mount } from '@vue/test-utils'
import IndecisionView from '@/views/IndecisionView.vue'
import ChatMessages from '@/components/chat/ChatMessages.vue'
import MessageBox from '@/components/chat/MessageBox.vue'
import { nextTick, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'

// Mock the useChat composable manualmente
const messages = ref([
  {
    id: 1,
    message: 'Hello',
    itsMine: true,
    image: 'https://example.com/image1.jpg',
  },
  {
    id: 2,
    message: 'Hi there?',
    itsMine: false,
    image: 'https://example.com/image2.jpg',
  },
])

vi.mock('@/composables/useChat', () => {
  return {
    useChat: () => ({
      messages,
      onMessage: (message: string) => {
        messages.value.push({
          id: Date.now(),
          message,
          itsMine: true,
          image: '',
        })
      },
    }),
  }
})

describe('IndecisionView.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(IndecisionView)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders ChatMessages and MessageBox components', () => {
    const wrapper = mount(IndecisionView)
    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true)
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true)
  })

  it('passes messages to ChatMessages component', () => {
    const wrapper = mount(IndecisionView)
    const chatMessages = wrapper.findComponent(ChatMessages)
    expect(chatMessages.props().messages).toEqual([
      {
        id: 1,
        message: 'Hello',
        itsMine: true,
        image: 'https://example.com/image1.jpg',
      },
      {
        id: 2,
        message: 'Hi there?',
        itsMine: false,
        image: 'https://example.com/image2.jpg',
      },
    ])
  })

  it('calls onMessage method when a message is sent', async () => {
    const wrapper = mount(IndecisionView)
    const messageBox = wrapper.findComponent(MessageBox)
    const newMessage = 'Hello'
    await messageBox.vm.$emit('send-message', newMessage)
    await nextTick() // Espera a que el DOM se actualice
    expect(messages.value).toEqual([
      {
        id: 1,
        message: 'Hello',
        itsMine: true,
        image: 'https://example.com/image1.jpg',
      },
      {
        id: 2,
        message: 'Hi there?',
        itsMine: false,
        image: 'https://example.com/image2.jpg',
      },
      {
        id: expect.any(Number), // Usamos expect.any(Number) para el id generado dinámicamente
        message: 'Hello',
        itsMine: true,
        image: '',
      },
    ])
  })
})
