import { sleep } from '@/helpers/sleep'
import type { ChatMessage } from '@/interfaces/chat-message-interface'
import type { YesNoResponse } from '@/interfaces/yes-no-response'
import { ref } from 'vue'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])
  const getResponse = async () => {
    const response = await fetch('https://yesno.wtf/api')
    const data = (await response.json()) as YesNoResponse
    return data
  }

  const onMessage = async (message: string) => {
    if (message.length === 0) return

    messages.value.push({
      id: messages.value.length + 1,
      message,
      itsMine: true,
    })

    if (!message.endsWith('?')) return

    await sleep(1)

    const { answer, image } = await getResponse()

    messages.value.push({
      id: messages.value.length + 1,
      message: answer,
      image,
      itsMine: false,
    })
  }

  return {
    // Properties
    messages,

    // Methods
    onMessage,
  }
}
