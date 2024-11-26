<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>

    <div>
      <button class="btn" @click="counter++">+1</button>
      <button class="btn" @click="counter--">-1</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Props {
  initialCounter: number
}

const props = defineProps<Props>()

const counter = ref(props.initialCounter ?? 0)
const squareCounter = computed(() => counter.value * counter.value)
</script>

<style scoped>
.btn {
  @apply p-5 bg-blue-500 rounded hover:bg-blue-700 mr-2;
}
</style>
