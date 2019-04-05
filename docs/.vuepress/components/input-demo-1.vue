<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-input value="中文"></z-input>
    <z-input value="中文"
      disabled></z-input>
    <z-input value="中文"
      readonly></z-input>

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
      content: `
        <z-input></z-input>
        <z-input value="中文"></z-input>
        <z-input value="中文"
          disabled></z-input>
        <z-input value="中文"
          readonly></z-input>
      `.replace(/^ {8}/gm, '').trim()
    }
  }
}
</script>