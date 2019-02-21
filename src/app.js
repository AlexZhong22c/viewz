import Vue from 'vue'
import Button from './view/button'
import Icon from './view/icon'

Vue.component('z-button', Button)
Vue.component('z-icon', Icon)

new Vue({
  el: '#app'
})