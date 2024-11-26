import { computed, ref } from 'vue'

export const useCounter = (initialCounter: number = 5) => {
  const counter = ref(initialCounter)
  const squareCounter = computed(() => counter.value * counter.value)

  return { counter, squareCounter }
}
