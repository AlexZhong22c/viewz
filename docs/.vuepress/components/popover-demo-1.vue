<template>
  <div style="padding-top: 16px;">
    <h2>设置弹出位置</h2>
    <p>
      <strong>预览</strong>
    </p>

    <z-popover>
      <z-button>上方弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="bottom">
      <z-button>下方弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="left">
      <z-button>左边弹出</z-button>
      <template slot="content">
        弹出内容
      </template>
    </z-popover>
    <z-popover position="right">
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
import ZButton from '../../../src/view/button'
import ZPopover from '../../../src/view/popover'

export default {
  components: { ZButton, ZPopover },
  data() {
    return {
      content: `
        <z-popover>
          <z-button>上方弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="bottom">
          <z-button>下方弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="left">
          <z-button>左边弹出</z-button>
          <template slot="content">
            弹出内容
          </template>
        </z-popover>
        <z-popover position="right">
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