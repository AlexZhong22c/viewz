<template>
  <div style="padding-top: 16px;">
    <h2>设置弹出位置</h2>
    <p>
      <strong>预览</strong>
    </p>

    <div>
      <z-button @click="$toast('点击弹出提示')">上方弹出</z-button>
      <z-button @click="$toast('点击弹出提示', {position:'middle'})">中间弹出</z-button>
      <z-button @click="$toast('点击弹出提示', {position:'bottom'})">下方弹出</z-button>
    </div>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<style>
.z-toast-wrapper {
  z-index: 30 !important;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}
</style>
<script>
import plugin from '../../../src/view/plugin'
import ZButton from '../../../src/view/button'
import Vue from 'vue'

Vue.use(plugin)

export default {
  components: { ZButton },
  data() {
    return {
      content: `
          <style>
          .z-toast-wrapper {
            z-index: 30 !important;
          }
          </style>

          <z-button @click="$toast('点击弹出提示')">上方弹出</z-button>
          <z-button @click="$toast('点击弹出提示', {position:'middle'})">中间弹出</z-button>
          <z-button @click="$toast('点击弹出提示', {position:'bottom'})">下方弹出</z-button>
      `
        .replace(/^ {8}/gm, '')
        .trim()
    }
  }
}
</script>