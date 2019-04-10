import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { mount } from '@vue/test-utils'

import Nav from '../../src/view/nav/nav'
import NavItem from '../../src/view/nav/nav-item'
import SubNav from '../../src/view/nav/sub-nav'

import Vue from 'vue'

describe('Nav.vue', () => {
  it('存在.', () => {
    expect(Nav).to.exist
  })
  it('支持 selected 属性', (done) => {
    Vue.component('z-nav-item', NavItem)
    Vue.component('z-sub-nav', SubNav)
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <z-nav-item name="home">首页</z-nav-item>
          <z-sub-nav name="about">
            <template slot="title">关于</template>
            <z-nav-item name="culture">企业文化</z-nav-item>
          </z-sub-nav>
        `
      }
    })

    setTimeout(() => {
      expect(wrapper.find('[data-name="home"]').classes()).contains('selected')
      done()
    })
  })

  // TODO:还有vercical属性没测
  // 事件剩下的测试还没写：

  it('会触发 update:selected 事件', (done) => {
    Vue.component('z-nav-item', NavItem)
    Vue.component('z-sub-nav', SubNav)
    const callback = sinon.fake();
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
          <z-nav-item name="home">首页</z-nav-item>
          <z-sub-nav name="about">
            <template slot="title">关于</template>
            <z-nav-item name="culture">企业文化</z-nav-item>
            <z-nav-item name="developers">开发团队</z-nav-item>
          </z-sub-nav>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    wrapper.find('[data-name="developers"]').trigger('click')
    expect(callback).to.have.been.calledWith('developers')
    done()
  })
})
