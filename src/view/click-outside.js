
/**
 * @file 最好写成插件：
 */

// old way1 in component:
// bindClickDocumentToClosePopover(e) {
//   const { cascader } = this.$refs
//   const { target } = e
//   if (cascader &&
//       (cascader === target || cascader.contains(target))
//   ) { return }
//   this.close()
// },

// old way2 with bug:
// 一个监听对应一个组件，太多了：
// export default {
//   bind: function (el, binding) {
//     document.addEventListener('click', e => {
//       const { target } = e
//       if (target === el || el.contains(target)) {
//         console.log('inside')
//         return
//       }
//       console.log('outside')
//       binding.value()
//     })
//   }
// }

// way3:这个写法有个小副作用，就是只要是点击外面，item.callback()就还是能被调用(即，需要用户自行removeListener)
// 而way1会帮用户remove的，并且全局中事件绑定总数会控制为0或1。
const callbacks = []
const bindClickDocumentToClosePopover = e => {
  const { target } = e
  callbacks.forEach(item => {
    const el = item.el
    if (target === el || el.contains(target)) {
      // return
    } else {
      item.callback()
    }
  })
}
document.addEventListener('click', bindClickDocumentToClosePopover)
export default {
  bind: function (el, binding) {
    callbacks.push({
      el,
      callback: binding.value
    })
  }
}

// 全部弹出组件都close的时候也没必要removeListener;一般就只有页面组件destroyed的时候才需要removeListener：
const removeListener = () => {
  document.removeEventListener('click', bindClickDocumentToClosePopover)
}

export { removeListener }
