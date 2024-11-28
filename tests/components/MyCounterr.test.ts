import { mount, VueWrapper } from '@vue/test-utils'
import MyCounter from '@/components/MyCounter.vue'

describe('MyCounter.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const value = 4
    wrapper = mount(MyCounter, {
      props: {
        initialCounter: value,
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('shoud match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the initial count', () => {
    expect(wrapper.text()).toContain('Counter: 4')
  })

  it('increments the count when the button is clicked', async () => {
    const button = wrapper.find('[id="btn_increment"]')
    await button.trigger('click')
    expect(wrapper.text()).toContain('Counter: 5')
    expect(wrapper.text()).toContain('Square: 25')
  })

  it('decrements the count when the button is clicked', async () => {
    const button = wrapper.find('[id="btn_decrement"]')
    await button.trigger('click')
    expect(wrapper.text()).toContain('Counter: 3')
    expect(wrapper.text()).toContain('Square: 9')
  })

  // it('resets the count when the reset button is clicked', () => {
  //   const wrapper = mount(MyCounter)
  //   const incrementButton = wrapper.find('button.increment')
  //   const resetButton = wrapper.find('button.reset')
  //   incrementButton.trigger('click')
  //   incrementButton.trigger('click')
  //   resetButton.trigger('click')
  //   expect(wrapper.text()).toContain('Count: 0')
  // })
})
