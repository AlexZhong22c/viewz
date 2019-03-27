/**
 * @file
 * @time 2019-03-27 全部重写了一次
 * 1. 因为mouseenter是不会冒泡的，所以我们必须要精确拿到对这个元素的引用。
 */
import { expect } from 'chai'
// import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Popover from '@/view/popover'

// chai.use(sinonChai)

describe('Popover', () => {

  it('存在.', () => {
    expect(Popover).to.exist
  })

  it('可以设置position.', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: { template: `<button>点我</button>` },
        content: '<div>弹出内容</div>'
      },
      propsData: {
        position: 'bottom'
      }
    })
    wrapper.find('button').trigger('click')
    let classes = wrapper.find('.z-popover__content-wrapper').classes()
    expect(classes).to.include('position-bottom')
  })

  it('可以设置 trigger', () => {
    const wrapper = mount(Popover, {
      slots: {
        default: { template: `<button>点我</button>` },
        content: '<div>弹出内容</div>'
      },
      propsData: {
        position: 'bottom',
        trigger: 'hover'
      }
    })
    expect(wrapper.find('.z-popover__content-wrapper').element).to.not.exist
    wrapper.trigger('mouseenter')
    expect(wrapper.find('.z-popover__content-wrapper').element).to.exist
  })

})