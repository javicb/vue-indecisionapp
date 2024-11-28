import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('should initialize counter with default value', () => {
    const { counter } = useCounter()
    expect(counter.value).toBe(5)
  })

  it('should initialize counter with provided value', () => {
    const { counter } = useCounter(10)
    expect(counter.value).toBe(10)
  })

  it('should compute square of the counter', () => {
    const { counter, squareCounter } = useCounter(3)
    expect(squareCounter.value).toBe(9)
    counter.value = 4
    expect(squareCounter.value).toBe(16)
  })

  it('should update counter value', () => {
    const { counter } = useCounter(2)
    counter.value = 5
    expect(counter.value).toBe(5)
  })
})
