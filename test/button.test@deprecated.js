/**
 * parce报错，试试加上-—no-cache和—no-minify运行
 * @file 已重写为spec.js
 * @file 整合上一次使用chai的要点：
 * 1. document.body.appendChild(iDiv)
 * 2. vm.$el.remove();vm.$destroy()
 * 3. window.getComputedStyle
 * 4. 没有import chai和sinon库也可以
 * 5. describe和it来自于mocha，BDD的特征就是使用 describe() 和it() 这两个方法
 */
const expect = chai.expect;
import Vue from 'vue'
// 要测试的文件：
import Button from '../src/view/button/button'
// !!测试button的时候，和原流程一样还是要引用ZIcon的：
import Icon from '../src/view/icon'
Vue.component('z-icon', Icon)

Vue.config.productionTip = false
Vue.config.devtools = false

// Button是一个对象，ButtonConstructor是一个函数：
const ButtonConstructor = Vue.extend(Button)

// describe 'dog': it has a head; it has two eyes; it can eat
describe('Button', () => {

  it('存在.', () => {
    expect(Button).to.exist
  })

  it('可以设置icon.', () => {
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings'
      }
    }).$mount()
    const useElement = vm.$el.querySelector('use')
    const href = useElement.getAttribute('xlink:href')
    expect(href).to.eq('#i-settings')
    vm.$destroy()
  })

  it('可以设置loading.', () => {
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings',
        loading: true
      }
    }).$mount()
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    const href = useElements[0].getAttribute('xlink:href')
    expect(href).to.eq('#i-loading')
    vm.$destroy()
  })

  it('icon 默认的 order 是 1', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings',
      }
    }).$mount(div)
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('1')
    vm.$el.remove()
    vm.$destroy()
  })

  it('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    }).$mount(div)
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
  })
  it('被点击触发 click 事件', () => {
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings'
      }
    }).$mount()

    const callback = sinon.fake();
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called

  })
})
