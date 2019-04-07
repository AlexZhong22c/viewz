/**
 * @file
 * @time 2019-03-27 全部重写了一次
 * 1. 获取getComputedStyle 需要 attachToDocument
 */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import { shallowMount, mount } from '@vue/test-utils'
import Button from '../../src/view/button/button'
import Icon from '../../src/view/icon'
// 这个import Vue可以优化：
import Vue from 'vue'
// !!测试button的时候，和原流程一样还是要引用ZIcon的：
Vue.component('z-icon', Icon)

describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.exist
  })

  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    })
    const useElement = wrapper.find('use')
    // useElements[0].getAttribute('xlink:href')
    // -- 对比 --：
    expect(useElement.attributes()['href']).to.equal('#i-settings')
    wrapper.destroy()
  })

  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true
      }
    })
    const useElements = wrapper.findAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements.at(0).attributes()['href']).to.equal('#i-loading')
    wrapper.destroy()
  })

  it('icon 默认的 order 是 1', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'settings',
      }
    })
    const icon = wrapper.find('svg').vm.$el
    expect(getComputedStyle(icon).order).to.eq('1')
    wrapper.destroy()
  })

  it('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button, {
      attachToDocument: true,
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    })
    const icon = wrapper.find('svg').vm.$el
    // 没用： console.log(wrapper.find('svg').element.style['order'])
    expect(getComputedStyle(icon).order).to.eq('2')
    wrapper.destroy()
  })

  it('点击 button 触发 click 事件', () => {
    const clickHandler = sinon.stub()
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    })
    // 用法1: propsData: { clickHandler }
    // 用法2: wrapper.setMethods({ click: clickHandler })
    // 用法1和用法2都不行。
    wrapper.vm.$on('click', clickHandler)
    wrapper.trigger('click')
    expect(clickHandler).to.have.been.called
  })
})
