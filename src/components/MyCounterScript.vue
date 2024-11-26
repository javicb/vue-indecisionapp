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
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MyCounterScript',
  props: {
    initialCounter: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const counter = ref(props.initialCounter)
    const squareCounter = computed(() => counter.value * counter.value)

    return { counter, squareCounter }
  },
})
</script>
