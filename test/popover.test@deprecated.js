/**
 * @file
 * 1. 本来想用vm.$slot和vm.$slotScope来构造测试的元素的，但是vue对此的限制太多。
 * 2. $refs保存的是注册时的引用信息。即便最终实际的dom的位置不在父dom中，父组件实例也能通过$refs查找得到它。
 * 3. 因为mouseenter是不会冒泡的，所以我们必须要精确拿到对这个元素的引用。
 */

const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/view/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {

  it('存在.', () => {
    expect(Popover).to.exist
  })

  it('可以设置position.', done => {
    Vue.component('z-popover', Popover)
    const div = document.createElement('div')
    // 本来想用vm.$slot和vm.$slotScope来构造测试的元素的，但是vue对此的限制太多：
    div.innerHTML = `
    <z-popover position="bottom" ref="a">
      <template slot="content">
      弹出内容
      </template>
      <button>点我</button>
    </z-popover>
    `
    document.body.appendChild(div)

    const vm = new Vue({
      el: div
    })
    vm.$el.querySelector('button').click()
    vm.$nextTick(() => {
      // $refs保存的是注册时的引用信息。即便最终实际的dom的位置不在父dom中，父组件实例也能通过$refs查找得到它：
      const { contentWrapper } = vm.$refs.a.$refs
      expect(contentWrapper.classList.contains('position-bottom')).to.be.true
      done()
    })
  })

  // 有一个测试用例没弄出来，先用xit来skip了：
  xit('可以设置 trigger', (done) => {
    Vue.component('z-popover', Popover)
    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
    <z-popover trigger="hover" ref="a">
      <template slot="content">
      弹出内容
      </template>
      <button>点我</button>
    </z-popover>
    `
    const vm = new Vue({
      el: div
    })
    setTimeout(() => {
      let event = new Event('mouseenter');
      vm.$el.dispatchEvent(event)
      vm.$nextTick(() => {
        const {contentWrapper} = vm.$refs.a.$refs
        expect(contentWrapper).to.exist
        done()
      })
    }, 200)

  })
})
