<template>
  <div class="z-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZNav',
  provide () {
    return {
      root: this
    }
  },
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.refreshChildrenSelectStatus()
    this.listenToChildrenSelect()
  },
  updated () {
    this.refreshChildrenSelectStatus()
  },
  computed: {
  },
  methods: {
    // 这个method直接通过inject provide暴露给子孙元素，这是一个大耦合：
    // 目前的作用是：更深层的z-nav-item也能调用到它：
    addItem (item) {
      this.items.push(item)
    },
    refreshChildrenSelectStatus () {
      this.items.forEach(item => {
        if (this.selected.includes(item.name)) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    listenToChildrenSelect () {
      this.items.forEach(item => {
        item.$on('add:selected', name => {
          if (this.multiple) {
            if (!this.selected.includes(name)) {
              let copy = JSON.parse(JSON.stringify(this.selected))
              copy.push(name)
              this.$emit('update:selected', copy)
            }
          } else {
            this.$emit('update:selected', [name])
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.z-nav {
  display: flex;
  border: 1px solid red;
}
</style>
