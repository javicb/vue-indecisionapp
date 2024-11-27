import { describe, it, expect, vi } from 'vitest'
import { sleep } from '../../src/helpers/sleep'

describe('sleep', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now()
    await sleep(2)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(2000)
  })

  it('should resolve after the default time of 1 second', async () => {
    const start = Date.now()
    await sleep()
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(1000)
  })

  it('should resolve immediately if 0 seconds is passed', async () => {
    const start = Date.now()
    await sleep(0)
    const end = Date.now()
    expect(end - start).toBeLessThan(50)
  })

  it('should call setTimeout with the correct delay', () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    sleep(3)
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3000)
    setTimeoutSpy.mockRestore()
  })
})
