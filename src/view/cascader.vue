<template>
  <div class="z-cascader"
    ref="cascader"
    v-click-outside="close">
    <div class="z-cascader__trigger"
      @click="onClickTrigger">
      <!-- 加&nbsp;顶着，不因为突变为有字在里面而高度变化 -->
      {{ result || '&nbsp;' }}
    </div>
    <div class="z-cascader__popover-wrapper"
      v-if="visible">
      <z-cascader-items :items="source"
        class="z-cascader__popover"
        :height="popoverHeight"
        :selected="selected"
        :load-data="loadData"
        :loading-item="loadingItem"
        @update:selected="onUpdateSelected"></z-cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'
import ClickOutside from './click-outside'

export default {
  name: 'zCascader',
  components: {
    'z-cascader-items': CascaderItems
  },
  directives: { ClickOutside },
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
      visible: false,
      loadingItem: {}
    }
  },
  computed: {
    result () {
      return this.selected.map(item => item.name).join('/')
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    onClickTrigger () {
      if (this.visible) {
        this.close()
      } else {
        this.open()
      }
    },
    onUpdateSelected (selected) {
      this.$emit('update:selected', selected)
      // bug:重复点击同一个item会重复触发请求(应该没必要)：
      const targetItem = selected[selected.length - 1]
      const __simplestFind = (list, id) => {
        return list.find(item => item.id === id)
      }
      const __complexFind = (list, id) => {
        const [ noChildren, hasChildren ] = [ [], [] ]
        list.forEach(item => {
          if (item.children) {
            hasChildren.push(item)
          } else {
            noChildren.push(item)
          }
        })
        let hasFound = __simplestFind(noChildren, id)
        if (hasFound) {
          return hasFound
        } else {
          hasFound = __simplestFind(hasChildren, id)
          for (let i = 0; i < hasChildren.length; i++) {
            hasFound = __complexFind(hasChildren[i].children, id)
            if (hasFound) return hasFound
          }
          return undefined
        }
      }
      const handler = result => {
        // wrong:(因为经过克隆，已经是另外一个对象引用了):
        // this.$set(targetItem, 'children', result)

        this.loadingItem = {}
        const copy = JSON.parse(JSON.stringify(this.source))
        const itemToUpdate = __complexFind(copy, targetItem.id)
        if (itemToUpdate) {
          itemToUpdate.children = result
          this.$emit('update:source', copy)
        }
      }
      // 最好就是用户的后端来告知isLeaf：
      if (!targetItem.isLeaf && this.loadData) {
        this.loadData(targetItem, handler)
        this.loadingItem = targetItem
      }
    }
  },
  created () {}
}
</script>

<style lang="scss">
@import 'var';
.z-cascader {
  display: inline-block;
  position: relative;
  .z-cascader__trigger {
    height: $z-button-height;
    min-width: 10em;
    padding: 0 1em;
    border: 1px solid $z-border-gray1;
    border-radius: $z-border-radius;
    background: $z-bg-white1;

    display: inline-flex;
    align-items: center;
  }
  .z-cascader__popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;

    // 弹出内容不想被后面的元素挡住：
    z-index: 1;

    margin-top: 8px;

    background: white;

    display: flex;

    @extend %z-box-shadow1;
  }
}
</style>
