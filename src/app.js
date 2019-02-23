import Vue from 'vue'
import Button from './view/button'
import ButtonGroup from './view/button-group'
import Icon from './view/icon'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-icon', Icon)

new Vue({
  el: '#app'
})

/**
 * 单元测试
 */
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)

const expect = chai.expect
// console.log(Button)
// Button是一个对象，ButtonConstructor是一个函数：
const ButtonConstructor = Vue.extend(Button)

try {
  /**
   * test icon prop:
   */
  // {
  //   const vm = new ButtonConstructor({
  //     propsData: {
  //       icon: 'settings'
  //     }
  //   })
  //   vm.$mount('#test-assert')
  //   const useElement = vm.$el.querySelector('use')
  //   const href = useElement.getAttribute('xlink:href')
  //   expect(href).to.eq('#i-settings')
  // }

  /**
   * test icon prop + loading prop:
   */
  // {
  //   const vm = new ButtonConstructor({
  //     propsData: {
  //       icon: 'settings',
  //       loading: true
  //     }
  //   })
  //   vm.$mount('#test-assert')
  //   const useElement = vm.$el.querySelector('use')
  //   const href = useElement.getAttribute('xlink:href')
  //   expect(href).to.eq('#i-loading')
  // }

  /**
   * @file 优化测试代码后：
   * 1. document.body.appendChild(iDiv)
   * 2. vm.$el.remove();vm.$destroy()
   */
  /**
   * test iconPosition prop(flex):
   */
  {
    const iDiv = document.createElement('div')
    document.body.appendChild(iDiv)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings'
      }
    })
    vm.$mount(iDiv)
    const svgElement = vm.$el.querySelector('svg')
    const { order } = window.getComputedStyle(svgElement)
    expect(order).to.eq('1')
    vm.$el.remove()
    vm.$destroy()
  }

  {
    const iDiv = document.createElement('div')
    document.body.appendChild(iDiv)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    })
    vm.$mount(iDiv)
    const svgElement = vm.$el.querySelector('svg')
    const { order } = window.getComputedStyle(svgElement)
    expect(order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
  }

  /**
   * test click event:
   */
  {
    const iDiv = document.createElement('div')
    document.body.appendChild(iDiv)
    const vm = new ButtonConstructor({
      propsData: {
        icon: 'settings'
      }
    })
    vm.$mount(iDiv)
    const spyFn = chai.spy(() => {})

    // vm.$on('click', () => {
    //   console.log(1)
    // })
    // change into:
    vm.$on('click', spyFn)
    // vm.$on('clickTest', spyFn)

    // console.log(vm.$el)
    const buttonElement = vm.$el
    buttonElement.click()
    expect(spyFn).to.have.been.called()
    vm.$el.remove()
    vm.$destroy()
  }
} catch (e) {
  window.errors = [e]
} finally {
  window.errors && window.errors.forEach(item => {
    // 断言的更多错误提示信息见item：
    console.error(item.message)
  });
}
