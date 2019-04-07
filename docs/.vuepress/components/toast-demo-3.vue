<template>
  <div style="padding-top: 16px;">
    <h2>支持 HTML</h2>
    <p>
      <strong>预览</strong>
    </p>

    <div>
      <z-button @click="onClickButton">上方弹出</z-button>
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
import ZButton from '../../../src/view/button/button'
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

          <div>
            <z-button @click="onClickButton">上方弹出</z-button>
          </div>

          methods: {
            onClickButton() {
              this.$toast('<strong style="color:red;">加粗的提示</strong>', {
                enableHTML: true
              })
            }
          },
      `
        .replace(/^ {8}/gm, '')
        .trim()
    }
  },
  methods: {
    onClickButton() {
      this.$toast('<strong style="color:red;">加粗的提示</strong>', {
        enableHTML: true
      })
    }
  }
}
</script>
