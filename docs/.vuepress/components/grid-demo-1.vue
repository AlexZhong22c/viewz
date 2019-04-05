<template>
  <div style="padding-top: 16px;">
    <h2>双向绑定</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-row>
      <z-col span="8"
        class="z-demo-col"></z-col>
      <z-col span="8"
        class="z-demo-col"></z-col>
      <z-col span="8"
        class="z-demo-col"></z-col>
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
.z-demo-col {
  height: 50px;
  border: 1px solid #ccc;
  background: #eee;
}
</style>

<script>
import zRow from '../../../src/view/row'
import zCol from '../../../src/view/col'

export default {
  components: { zRow, zCol },
  data() {
    return {
      value: '1',
      content: `
          data: {
            return {
              value: '1'
            }
          }

          <z-row>
            <z-col span="8"
              class="z-demo-col"></z-col>
            <z-col span="8"
              class="z-demo-col"></z-col>
            <z-col span="8"
              class="z-demo-col"></z-col>
          </z-row>

          .z-demo-col {
            height: 50px;
            border: 1px solid #ccc;
            background: #eee;
          }
      `
        .replace(/ {8}/g, '')
        .trim()
    }
  }
}
</script>