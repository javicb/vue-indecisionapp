<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square: {{ squareCounter }}</h3>

    <div>
      <button @click="counter++">+1</button>
      <button @click="counter--">-1</button>
    </div>
  </section>
</template>

<script lang="ts">
import { useCounter } from '@/composables/useCounter'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyCounterScript',
  props: {
    initialCounter: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { counter, squareCounter } = useCounter(props.initialCounter)

    return { counter, squareCounter }
  },
})
</script>
