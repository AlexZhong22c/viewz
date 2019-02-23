import Vue from 'vue'
import Button from './view/button'
import ButtonGroup from './view/button-group'
import Icon from './view/icon'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-icon', Icon)

new Vue({
  el: '#app'
})