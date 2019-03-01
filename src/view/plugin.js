import Toast from './toast'

export default {
  install (Vue, options) {
    Vue.prototype.$toast = (message, toastOption) => {
      const Constructor = Vue.extend(Toast)
      const toast = new Constructor({
        // vue官网说 propsData 仅用于测试：
        // 解耦带来的麻烦是，要多传一次参数：
        propsData: toastOption
      })
      toast.$slots.default = [message]
      toast.$mount()
      document.body.appendChild(toast.$el)
    }
  }
}