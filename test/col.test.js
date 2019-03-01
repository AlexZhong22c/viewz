const expect = chai.expect;
import Vue from 'vue'
import Col from '../src/view/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {

  it('存在.', () => {
    expect(Col).to.exist
  })
  it('接收 span 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        span: 1
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-col-1')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  it('接收 offset 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        offset: 1
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-offset-1')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  it('接收 ipad 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        ipad: {span: 1, offset: 2}
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-col-ipad-1')).to.eq(true)
    expect(vm.$el.classList.contains('z-offset-ipad-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  it('接收 pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        pc: {span: 1, offset: 2}
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-col-pc-1')).to.eq(true)
    expect(vm.$el.classList.contains('z-offset-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  it('接收 narrow-pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        narrowPc: {span: 1, offset: 2}
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-col-narrow-pc-1')).to.eq(true)
    expect(vm.$el.classList.contains('z-offset-narrow-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })
  it('接收 wide-pc 属性', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Col)
    const vm = new Constructor({
      propsData: {
        widePc: {span: 1, offset: 2}
      }
    }).$mount(div)

    expect(vm.$el.classList.contains('z-col-wide-pc-1')).to.eq(true)
    expect(vm.$el.classList.contains('z-offset-wide-pc-2')).to.eq(true)
    div.remove()
    vm.$destroy()
  })

})