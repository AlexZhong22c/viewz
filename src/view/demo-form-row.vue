<template>
  <div class="demo-form-row">
    <label>{{label}}</label>
    <div>
      <slot></slot>
      <div>
        {{error && Object.values(error)[0]}}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .demo-form-row {
    padding: 8px 0;
    display: flex;
    label {
      margin-right: 1em;
    }
  }
</style>

<script>
export default {
  name: 'demoFormRow',
  props: {
    label: {
      type: String,
      required: true
    },
    error: {
      type: Object
    }
  }
}
</script>
