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
