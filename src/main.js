import Vue from 'vue'
import Demo from './view/demo.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Demo)
}).$mount('#app')
