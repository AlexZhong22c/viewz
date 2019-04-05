<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-button>默认按钮</z-button>
    <z-button icon="settings">默认按钮</z-button>
    <z-button :loading="true">默认按钮</z-button>
    <z-button disabled>默认按钮</z-button>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import ZButton from '../../../src/view/button'

  export default {
    name: 'buttonDemos',
    components: {
      ZButton
    },
    data () {
      return {
        // FIXME:连html属性前的空格也去掉了：
        content: `
          <z-button>默认按钮</z-button>
          <z-button icon="settings">默认按钮</z-button>
          <z-button :loading="true">默认按钮</z-button>
          <z-button disabled>默认按钮</z-button>
      `.replace(/^ {8}/gm, '').trim()
      }
    }
  }
</script>
