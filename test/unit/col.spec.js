import { expect } from 'chai'
import Col from '@/view/col'
import { mount } from '@vue/test-utils';

describe('Col', () => {

  it('存在.', () => {
    expect(Col).to.exist
  })
  it('接收 span 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        span: 1
      }
    })

    expect(wrapper.classes()).contains('z-col-1')
    wrapper.destroy()
  })
  it('接收 offset 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        offset: 1
      }
    })

    expect(wrapper.classes()).contains('z-offset-1')
    wrapper.destroy()
  })
  it('接收 ipad 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        ipad: {span: 1, offset: 2}
      }
    })

    const classes = wrapper.classes()
    expect(classes).contains('z-col-ipad-1')
    expect(classes).contains('z-offset-ipad-2')
    wrapper.destroy()
  })
  it('接收 pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        pc: {span: 1, offset: 2}
      }
    })

    const classes = wrapper.classes()
    expect(classes).contains('z-col-pc-1')
    expect(classes).contains('z-offset-pc-2')
    wrapper.destroy()
  })
  it('接收 narrow-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        narrowPc: {span: 1, offset: 2}
      }
    })

    const classes = wrapper.classes()
    expect(classes).contains('z-col-narrow-pc-1')
    expect(classes).contains('z-offset-narrow-pc-2')
    wrapper.destroy()
  })
  it('接收 wide-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        widePc: {span: 1, offset: 2}
      }
    })

    const classes = wrapper.classes()

    expect(classes).contains('z-col-wide-pc-1')
    expect(classes).contains('z-offset-wide-pc-2')
    wrapper.destroy()
  })

})