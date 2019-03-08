const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/view/tabs'
import TabsHead from '../src/view/tabs/tabs-head'
import TabsBody from '../src/view/tabs/tabs-body'
import TabsItem from '../src/view/tabs/tabs-item'
import TabsPane from '../src/view/tabs/tabs-pane'

Vue.component('z-tabs', Tabs)
Vue.component('z-tabs-head', TabsHead)
Vue.component('z-tabs-body', TabsBody)
Vue.component('z-tabs-item', TabsItem)
Vue.component('z-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {

  it('存在.', () => {
    expect(Tabs).to.exist
  })

  // 放弃测试:(因为不会弄expect异步的throw error) tabs的子组件应该是tabs-head和tabs-body，但你没有设置子组件。

  it('接受 selected 属性', done => {

    const div = document.createElement('div')
    document.body.appendChild(div)
    div.innerHTML = `
      <z-tabs selected="css">
        <z-tabs-head>
          <z-tabs-item name="js"> 111 </z-tabs-item>
          <z-tabs-item name="css"> 222 </z-tabs-item>
          <z-tabs-item name="html"> 333 </z-tabs-item>
        </z-tabs-head>
        <z-tabs-body>
          <z-tabs-pane name="js"> 111相关资讯 </z-tabs-pane>
          <z-tabs-pane name="css"> 222相关资讯 </z-tabs-pane>
          <z-tabs-pane name="html"> 333相关资讯 </z-tabs-pane>
        </z-tabs-body>
      </z-tabs>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      // console.log(vm.$el.outerHTML)

      // 原html要增加data-name属性用于区分：
      const x = vm.$el.querySelector(`.z-tabs-item[data-name="css"]`)
      expect(x.classList.contains('active')).to.be.true
      done()
    })
  })

  it('可以接受 direction prop', () => {
    // TODO:
  })

})