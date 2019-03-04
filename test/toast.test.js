/**
 * @file
 * 没有什么新的知识点
 */
const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/view/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
  it('存在.', () => {
    expect(Toast).to.exist
  })
  describe('props', () => {
    // 其实是不借助Vue.use(plugin)的：
    const ToastConstructor = Vue.extend(Toast)
    let vm
    it('可以设置autoClose.', (done) => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      // vm = new ToastConstructor({
      //   propsData: {
      //     value: '1234'
      //   }
      // }).$mount()
      vm = new ToastConstructor({
        propsData: {          
          autoClose: 1,
          // mocha setTimeout不能设置太久；或者可以主动延长mocha的时间限制：
          // 时间限制 是为了让done测试有意义的机制
          // autoCloseDelay: 1
        }
      }).$mount(div)
      // 对比：
      // const inputElement = vm.$el.querySelector('input')
      // setTimeout(() => {
      //   expect(document.body.contains(vm.$el)).to.eq(false)
      //   done()
      // }, 1500);
      vm.$on('beforeClose', () => {
        expect(document.body.contains(vm.$el)).to.eq(false)
        done()
      })
    })

    it('接受 closeButton', (done) => {
      const callback = sinon.fake();
      vm = new ToastConstructor({
        propsData: {
          closeButtonOption: {
            text: '关闭吧111',
            callback,
          }
        }
      }).$mount()
      let closeButton = vm.$el.querySelector('.z-toast__close-button')
      expect(closeButton.textContent.trim()).to.eq('关闭吧111')
      // js原生的click:
      setTimeout(() => {
        closeButton.click()
        expect(callback).to.have.been.called
        done()
      }, 200)
    })
    it('接受 enableHTML', () => {
      vm = new ToastConstructor({
        propsData: {
          enableHTML: true
        }
      })
      // 可以防止页面已经有strong标签，给它个独一无二的id：
      vm.$slots.default = ['<strong id="test">hi</strong>']
      vm.$mount()
      let strong = vm.$el.querySelector('#test')
      expect(strong).to.exist
    })
    it('接受 position', () => {
      vm = new ToastConstructor({
        propsData: {
          position: 'bottom'
        }
      }).$mount()
      expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
    })
  })
})
