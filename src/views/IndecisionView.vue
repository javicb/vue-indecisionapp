<!-- Fuente: https://tailwindcomponents.com/component/chat-layout -->
<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Chat</span>
    </div>

    <ChatMessages :messages="messages" />

    <MessageBox />
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from '@/components/chat/ChatMessages.vue'
import MessageBox from '@/components/chat/MessageBox.vue'
import type { ChatMessage } from '@/interfaces/chat-message-interface'
import { ref } from 'vue'

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    message: 'Quieres un café?',
    itsMine: true,
  },
  {
    id: 2,
    message: 'Sí',
    itsMine: false,
    image:
      'https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif',
  },
  {
    id: 3,
    message: 'Te apatece con espárragos?',
    itsMine: true,
  },
  {
    id: 4,
    message: 'No',
    itsMine: false,
    image:
      'https://yesno.wtf/assets/no/24-159febcfd655625c38c147b65e5be565.gif',
  },
])
</script>
