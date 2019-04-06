<template>
  <div style="padding-top: 16px;">
    <h2>设置 gutter</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-row class="z-demo-row"
      gutter="10">
      <z-col span="8">
        <div class="z-demo-col">8</div>
      </z-col>
      <z-col span="8">
        <div class="z-demo-col">8</div>
      </z-col>
      <z-col span="8">
        <div class="z-demo-col">8</div>
      </z-col>
    </z-row>

    <z-row class="z-demo-row" gutter="10">
      <z-col span="6">
        <div class="z-demo-col">6</div>
      </z-col>
      <z-col span="6">
        <div class="z-demo-col">6</div>
      </z-col>
      <z-col span="6">
        <div class="z-demo-col">6</div>
      </z-col>
      <z-col span="6">
        <div class="z-demo-col">6</div>
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
import ZRow from '../../../src/view/row'
import ZCol from '../../../src/view/col'

export default {
  components: { ZRow, ZCol },
  data() {
    return {
      content: `
          <z-row class="z-demo-row"
            gutter="10">
            <z-col span="8">
              <div class="z-demo-col">8</div>
            </z-col>
            <z-col span="8">
              <div class="z-demo-col">8</div>
            </z-col>
            <z-col span="8">
              <div class="z-demo-col">8</div>
            </z-col>
          </z-row>

          <z-row class="z-demo-row" gutter="10">
            <z-col span="6">
              <div class="z-demo-col">6</div>
            </z-col>
            <z-col span="6">
              <div class="z-demo-col">6</div>
            </z-col>
            <z-col span="6">
              <div class="z-demo-col">6</div>
            </z-col>
            <z-col span="6">
              <div class="z-demo-col">6</div>
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
      `.replace(/^ {8}/gm, '').trim()
    }
  }
}
</script>