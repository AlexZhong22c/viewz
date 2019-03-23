<template>
  <div class="z-cascader">
    <div class="z-cascader__trigger"
      @click="popoverVisible = !popoverVisible">
      <!-- 不因为突然有字在里面而高度变化 -->
      {{ result || '&nbsp;' }}
    </div>
    <div class="z-cascader__popover-wrapper"
      v-if="popoverVisible">
      <z-cascader-items :items="source"
        class="z-cascader__popover"
        :height="popoverHeight"
        :selected="selected"
        @update:selected="onUpdateSelected"></z-cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'

export default {
  name: 'zCascader',
  components: {
    'z-cascader-items': CascaderItems
  },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    loadData: {
      type: Function
    }
  },
  data () {
    return {
      popoverVisible: false
    }
  },
  computed: {
    result () {
      return this.selected.map(item => item.name).join('/')
    }
  },
  methods: {
    onUpdateSelected (selected) {
      this.$emit('update:selected', selected)
      // bug:重复点击同一个item会重复触发请求(应该没必要)：
      const targetItem = selected[selected.length - 1]
      const handler = result => {
        // todo
        // wrong(因为经过克隆，已经是另外一个对象引用了):
        // this.$set(targetItem, 'children', result)
      }
      this.loadData(targetItem, handler)
    }
  },
  created () {}
}
</script>

<style lang="scss">
@import 'var';
// FIXME: 样式随便写的，不科学的写法：
.z-cascader {
  position: relative;
  .z-cascader__trigger {
    height: $z-button-height;
    min-width: 10em;
    padding: 0 1em;
    border: 1px solid $z-border-gray1;
    border-radius: $z-border-radius;

    display: inline-flex;
    align-items: center;
  }
  .z-cascader__popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;

    margin-top: 8px;

    background: white;

    display: flex;

    @extend %z-box-shadow1;
  }
}
</style>
