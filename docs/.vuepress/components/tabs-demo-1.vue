<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <z-tabs :selected="selected">
      <z-tabs-head>
        <z-tabs-item name="CSS">CSS</z-tabs-item>
        <z-tabs-item name="HTML">HTML</z-tabs-item>
      </z-tabs-head>
      <z-tabs-body>
        <z-tabs-pane name="CSS">the content of CSS topic</z-tabs-pane>
        <z-tabs-pane name="HTML">the content of HTML topic</z-tabs-pane>
      </z-tabs-body>
    </z-tabs>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import ZTabs from '../../../src/view/tabs'
  import ZTabsBody from '../../../src/view/tabs/tabs-body'
  import ZTabsHead from '../../../src/view/tabs/tabs-head'
  import ZTabsItem from '../../../src/view/tabs/tabs-item'
  import ZTabsPane from '../../../src/view/tabs/tabs-pane'

  export default {
    components: {ZTabs, ZTabsBody, ZTabsHead, ZTabsItem, ZTabsPane},
    data () {
      return {
        selected: 'CSS',
        content: `
          data: {
            return {
              selected: 'CSS'
            }
          }

          <z-tabs :selected="selected">
            <z-tabs-head>
              <z-tabs-item name="CSS">CSS</z-tabs-item>
              <z-tabs-item name="HTML">HTML</z-tabs-item>
            </z-tabs-head>
            <z-tabs-body>
              <z-tabs-pane name="CSS">the content of CSS topic</z-tabs-pane>
              <z-tabs-pane name="HTML">the content of HTML topic</z-tabs-pane>
            </z-tabs-body>
          </z-tabs>
      `.replace(/^ {8}/gm, '').trim()
      }
    }
  }
</script>