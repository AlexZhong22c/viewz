<template>
  <div style="padding-top: 16px;">
    <h2>设置偏移</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-row class="z-demo-row"
      gutter="10">
      <z-col span="8">
        <div class="z-demo-col">8</div>
      </z-col>
      <z-col span="8"
        offset="8">
        <div class="z-demo-col">8</div>
      </z-col>
    </z-row>

    <z-row class="z-demo-row"
      gutter="10">
      <z-col span="6"
        offset="6">
        <div class="z-demo-col">6</div>
      </z-col>
      <z-col span="6"
        offset="6">
        <div class="z-demo-col">6</div>
      </z-col>
    </z-row>

    <z-row class="z-demo-row"
      gutter="10">
      <z-col span="4">
        <div class="z-demo-col">4</div>
      </z-col>
      <z-col span="4"
        offset="4">
        <div class="z-demo-col">4</div>
      </z-col>
      <z-col span="4"
        offset="8">
        <div class="z-demo-col">4</div>
      </z-col>
    </z-row>

    <z-row class="z-demo-row"
      gutter="10">
      <z-col span="2" v-for="n in 8" :key="n" offset="1">
        <div class="z-demo-col">2</div>
      </z-col>
    </z-row>
    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.z-demo-row {
  margin: 10px 0;
}
.z-demo-col {
  height: 50px;
  border: 1px solid #ccc;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
import zRow from '../../../src/view/row'
import zCol from '../../../src/view/col'

export default {
  components: { zRow, zCol },
  data() {
    return {
      content: `
          <z-row class="z-demo-row"
            gutter="10">
            <z-col span="8">
              <div class="z-demo-col">8</div>
            </z-col>
            <z-col span="8"
              offset="8">
              <div class="z-demo-col">8</div>
            </z-col>
          </z-row>

          <z-row class="z-demo-row"
            gutter="10">
            <z-col span="6"
              offset="6">
              <div class="z-demo-col">6</div>
            </z-col>
            <z-col span="6"
              offset="6">
              <div class="z-demo-col">6</div>
            </z-col>
          </z-row>

          <z-row class="z-demo-row"
            gutter="10">
            <z-col span="4">
              <div class="z-demo-col">4</div>
            </z-col>
            <z-col span="4"
              offset="4">
              <div class="z-demo-col">4</div>
            </z-col>
            <z-col span="4"
              offset="8">
              <div class="z-demo-col">4</div>
            </z-col>
          </z-row>

          <z-row class="z-demo-row"
            gutter="10">
            <z-col span="2" v-for="n in 8" :key="n" offset="1">
              <div class="z-demo-col">2</div>
            </z-col>
          </z-row>

          * {
            box-sizing: border-box;
          }
          .z-demo-row {
            margin: 10px 0;
          }
          .z-demo-col {
            height: 50px;
            border: 1px solid #ccc;
            background: #eee;
            display: flex;
            justify-content: center;
            align-items: center;
          }
      `
      .replace(/ {8}/g, '')
      .trim()
    }
  }
}
</script>