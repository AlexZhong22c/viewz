<template>
  <div>
    <z-button>默认按钮</z-button>
    <z-button icon="settings">默认按钮</z-button>
    <z-button :loading="true">默认按钮</z-button>
    <z-button disabled>默认按钮</z-button>

    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import Button from '../../../src/view/button'

  export default {
    name: 'buttonDemos',
    components: {
      'z-button': Button
    },
    data () {
      return {
        // FIXME:连html属性前的空格也去掉了：
        content: `
          <z-button>默认按钮</z-button>
          <z-button icon="settings">默认按钮</z-button>
          <z-button :loading="true">默认按钮</z-button>
          <z-button disabled>默认按钮</z-button>
      `.replace(/\t+| {2,}/g, '').trim()
      }
    }
  }
</script>
