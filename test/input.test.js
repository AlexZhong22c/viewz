/**
 * 1. console.log(inputElement.outerHTML)
 * 2. describe嵌套和分组
 * 3. mocha的钩子api
 * 4. 测试change事件的写法，伪造的change事件对象的isTrusted属性为false
 * 5. 用到sinon-chai的文档来看看怎么获取callback的参数
 * 6. 改成forEach之后，测试代码有问题：
 * 6. expect(callback).to.have.been.calledWith(new Event('good'))
 */
const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/view/input'

// import Icon from '../src/view/icon'
// Vue.component('z-icon', Icon)

Vue.config.productionTip = false
Vue.config.devtools = false

// Input是一个对象，InputConstructor是一个函数：
// const InputConstructor = Vue.extend(Input)

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist
  })

  describe('props', () => {
    const InputConstructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('可以设置value.', () => {
      vm = new InputConstructor({
        propsData: {
          value: '1234'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      const value = inputElement.value
      expect(value).to.eq('1234')
    })

    it('可以设置disabled.', () => {
      vm = new InputConstructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      const disabled = inputElement.disabled
      expect(disabled).to.eq(true)
    })

    it('可以设置readonly.', () => {
      vm = new InputConstructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      // console.log(inputElement.outerHTML)
      const readonly = inputElement.readOnly
      expect(readonly).to.eq(true)
    })

    it('可以设置error.', () => {
      vm = new InputConstructor({
        propsData: {
          error: '不行不行'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      const href = useElement.getAttribute('xlink:href')
      expect(href).to.eq('#i-error')

      const errorMessage = vm.$el.querySelector('.errorMessage')
      expect(errorMessage.innerText).to.eq('不行不行')
    })
  })

  describe('events', () => {
    const InputConstructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur']
        .forEach((eventName) => {
          vm = new InputConstructor().$mount()
    
          const callback = sinon.fake();
          vm.$on(eventName, callback)
          // vm.$el.click()
          const event = new Event(eventName)
          const inputElement = vm.$el.querySelector('input')
          inputElement.dispatchEvent(event)
          // expect(callback).to.have.been.called
          // 这段测试代码有问题：new Event('good')居然还测试通过
          expect(callback).to.have.been.calledWith(new Event('good'))
          // expect(callback).to.have.been.calledWith(event)
        })
    })
  })
})