<template lang="pug">
  button.v-button(:class="{'processing': computedProcessing}"
                  :disabled="disabled || computedProcessing"
                  @click.stop="onClick")
    span: slot
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      disabled: Boolean,
      processing: Boolean,
      onclick: Function
    },
    data() {
      return {
        scopedProcessing: false
      }
    },
    computed: {
      computedProcessing(): boolean {
        return this.processing || this.scopedProcessing
      }
    },
    methods: {
      async onClick() {
        this.scopedProcessing = true
        this.$emit('update:processing', true)
        if (this.onclick) {
          await this.onclick()
        }
        this.$emit('update:processing', false)
        this.scopedProcessing = false
      }
    }
  })
</script>

<style lang="sass" scoped>
  .v-button
    transition: all .2s ease
</style>
