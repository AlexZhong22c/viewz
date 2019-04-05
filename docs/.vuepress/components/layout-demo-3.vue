<template>
  <div style="padding-top: 16px;">
    <h2>布局</h2>
    <p>
      <strong>预览</strong>
    </p>

    <z-layout style="color: white; overflow:hidden; margin-bottom:50px;">
      <z-sider style=" background:#ddd; width:200px; color: black;">
        sider
      </z-sider>
      <z-layout>
        <z-header style="height: 50px; background:lightskyblue;">
          header
        </z-header>
        <z-content style="height: 100px; background:deepskyblue;">
          content
        </z-content>
        <z-footer style="height: 50px; background:lightskyblue;">
          footer
        </z-footer>
      </z-layout>
    </z-layout>

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
</style>

<script>
import ZLayout from '../../../src/view/layout'
import ZHeader from '../../../src/view/layout/header'
import ZFooter from '../../../src/view/layout/footer'
import ZContent from '../../../src/view/layout/content'
import ZSider from '../../../src/view/layout/sider'

export default {
  components: { ZLayout, ZHeader, ZFooter, ZContent, ZSider },
  data() {
    return {
      content: `
        <z-layout style="color: white; overflow:hidden; margin-bottom:50px;">
          <z-sider style=" background:#ddd; width:200px; color: black;">
            sider
          </z-sider>
          <z-layout>
            <z-header style="height: 50px; background:lightskyblue;">
              header
            </z-header>
            <z-content style="height: 100px; background:deepskyblue;">
              content
            </z-content>
            <z-footer style="height: 50px; background:lightskyblue;">
              footer
            </z-footer>
          </z-layout>
        </z-layout>
      `
        .replace(/^ {8}/gm, '')
        .trim()
    }
  }
}
</script>