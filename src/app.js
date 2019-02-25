import Vue from 'vue'
import Button from './view/button'
import ButtonGroup from './view/button-group'
import Icon from './view/icon'
import Input from './view/input'
import Row from './view/row'
import Col from './view/col'

Vue.component('z-button', Button)
Vue.component('z-button-group', ButtonGroup)
Vue.component('z-icon', Icon)
Vue.component('z-input', Input)
Vue.component('z-row', Row)
Vue.component('z-col', Col)

new Vue({
  el: '#app'
})
