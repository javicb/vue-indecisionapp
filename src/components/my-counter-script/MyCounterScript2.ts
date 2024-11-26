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
