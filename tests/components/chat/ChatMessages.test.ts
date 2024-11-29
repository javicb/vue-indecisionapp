import { mount } from '@vue/test-utils'
import ChatMessages from '@/components/chat/ChatMessages.vue'
import ChatBubble from '@/components/chat/ChatBubble.vue'
import { nextTick } from 'vue'
import type { ChatMessage } from '@/interfaces/chat-message-interface'
import { describe, expect, it } from 'vitest'

describe('ChatMessages.vue', () => {
  const messages: ChatMessage[] = [
    { id: 1, message: 'Hello', itsMine: true, image: '' },
    {
      id: 2,
      message: 'Hi there?',
      itsMine: false,
      image: 'https://example.com/image.jpg',
    },
  ]

  it('renders correctly', () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })
    expect(wrapper.findAllComponents(ChatBubble).length).toBe(messages.length)
  })

  it('renders messages correctly', () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })
    const chatBubbles = wrapper.findAllComponents(ChatBubble)
    chatBubbles.forEach((bubble, index) => {
      const messageProps = bubble.props() as ChatMessage
      const expectedProps = messages[index]

      // Filtrar las propiedades relevantes de messageProps
      const filteredMessageProps = (
        Object.keys(expectedProps) as (keyof ChatMessage)[]
      ).reduce(
        (obj, key) => {
          obj[key] = messageProps[key]
          return obj
        },
        {} as Partial<Record<keyof ChatMessage, unknown>>,
      )
      expect(filteredMessageProps).toMatchObject(expectedProps)
    })
  })

  it('scrolls to bottom when new messages are added', async () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    })

    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement

    // Mock the scrollHeight and scrollTop properties
    Object.defineProperty(chatRef, 'scrollTo', {
      value: 1000,
      writable: true,
    })
    Object.defineProperty(chatRef, 'scrollTo', { value: 0, writable: true })

    // Add a new message
    wrapper.setProps({
      messages: [
        ...messages,
        { id: 3, message: 'New message', itsMine: true, image: '' },
      ],
    })
    await nextTick()

    // Verify scrollTo was updated
    expect(chatRef.scrollTo).toBe(chatRef.scrollHeight)
  })
})
