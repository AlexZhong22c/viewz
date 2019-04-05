<template>
  <div style="padding-top: 16px;">
    <h2>双向绑定</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-input v-model="value"></z-input>
    <div>value: {{value}}</div>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
import ZInput from '../../../src/view/input'

export default {
  components: { ZInput },
  data() {
    return {
      value: '1',
      content: `
          data: {
            return {
              value: '1'
            }
          }

          <z-input v-model="value"></z-input>
          <div>value: {{value}}</div>
      `
        .replace(/ {8}/g, '')
        .trim()
    }
  }
}
</script>