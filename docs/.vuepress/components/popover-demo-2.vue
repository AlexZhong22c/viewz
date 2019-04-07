<template>
  <div style="padding-top: 16px;">
    <h2>将触发方式改为 hover</h2>
    <p>
      <strong>预览</strong>
    </p>

    <z-popover trigger="hover">
      <z-button>上方弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="bottom" trigger="hover">
      <z-button>下方弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="left" trigger="hover">
      <z-button>左边弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="right" trigger="hover">
      <z-button>右边弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>

<script>
import ZButton from '../../../src/view/button/button'
import ZPopover from '../../../src/view/popover'

export default {
  components: { ZButton, ZPopover },
  data() {
    return {
      content: `
        <z-popover trigger="hover">
          <z-button>上方弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="bottom" trigger="hover">
          <z-button>下方弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="left" trigger="hover">
          <z-button>左边弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="right" trigger="hover">
          <z-button>右边弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
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
