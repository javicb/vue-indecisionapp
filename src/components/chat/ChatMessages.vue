<template>
  <div class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <ChatBubble :itsMine="true" message="Mensaje de chat 1" />
      <ChatBubble
        :itsMine="false"
        message="Si"
        image="https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatBubble from './ChatBubble.vue'
</script>
