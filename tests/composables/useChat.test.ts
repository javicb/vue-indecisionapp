import { useChat } from '@/composables/useChat'
import { sleep } from '@/helpers/sleep'
import type { YesNoResponse } from '@/interfaces/yes-no-response'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/helpers/sleep', () => ({
  sleep: vi.fn(),
}))

describe('useChat', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('adds a message to the messages array', async () => {
    const { messages, onMessage } = useChat()
    await onMessage('Hello')
    expect(messages.value).toEqual([
      {
        id: expect.any(Number),
        message: 'Hello',
        itsMine: true,
      },
    ])
  })

  it('does not add a message if the message is empty', async () => {
    const { messages, onMessage } = useChat()
    await onMessage('')
    expect(messages.value).toEqual([])
  })

  it('adds a response message if the message ends with a question mark', async () => {
    const { messages, onMessage } = useChat()

    const mockResponse: YesNoResponse = {
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif',
    }

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      }),
    ) as unknown as typeof fetch

    await onMessage('Is this a question?')
    await sleep(1)

    expect(messages.value).toEqual([
      {
        id: 1,
        message: 'Is this a question?',
        itsMine: true,
      },
      {
        id: 2,
        message: 'Yes',
        image: 'https://yesno.wtf/assets/yes/2.gif',
        itsMine: false,
      },
    ])
  })

  it('does not add a response message if the message does not end with a question mark', async () => {
    const { messages, onMessage } = useChat()
    await onMessage('This is not a question')
    await sleep(1)
    expect(messages.value).toEqual([
      {
        id: 1,
        message: 'This is not a question',
        itsMine: true,
      },
    ])
  })
})
