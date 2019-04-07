<template>
  <div class="z-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZNav',
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
  mounted () {
    this.refreshChildrenSelectStatus()
    this.listenToChildrenSelect()
  },
  updated () {
    this.refreshChildrenSelectStatus()
  },
  computed: {
    items () {
      return this.$children.filter(item => item.$options.name === 'ZNavItem')
    }
  },
  methods: {
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
