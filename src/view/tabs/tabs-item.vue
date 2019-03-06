<template>
  <div class="z-tabs-item" @click="onClickItem" :class="tabsItemClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'zTabsItem',
    inject: [ 'eventBus' ],
    data () {
      return {
        active: false
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: [ String, Number ],
        required: true
      }
    },
    computed: {
      tabsItemClass () {
        return {
          active: this.active
        }
      }
    },
    created () {
      this.eventBus.$on('update:selected',
      name => {
        this.active = name === this.name
      })
    },
    methods: {
      onClickItem() {
        this.eventBus.$emit('update:selected', this.name, this)
      }
    }
  }
</script>

<style lang="scss">
  .z-tabs-item {
    $blue: blue;
    flex-shrink: 0;

    display: flex;
    align-items: center;

    height: 100%;
    padding: 0 1em;

    cursor: pointer;

    &.active {
      color: $blue;
      font-weight: bold;
    }
  }
</style>