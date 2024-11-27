import type { ChatMessage } from '@/interfaces/chat-message-interface'
import { ref } from 'vue'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])

  const onMessage = (message: string) => {
    messages.value.push({
      id: messages.value.length + 1,
      message,
      itsMine: true,
    })
  }

  return {
    // Properties
    messages,

    // Methods
    onMessage,
  }
}
