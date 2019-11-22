<template lang="pug">
  div.basic-modal
    header.v-modal-card-head(v-if="title")
      p.v-modal-card-title(v-html="title")
    section.v-modal-card-body(v-if="message")
      p(v-html="message")
    footer.v-modal-card-foot(v-if="okText || cancelText")
      v-button.btn-ok(v-if="okText" :onclick="ok") {{ okText }}
      v-button.btn-cancel(v-if="cancelText" :onclick="cancel") {{ cancelText }}
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      title: String,
      message: String,
      okText: String,
      onOk: Function,
      cancelText: String,
      onCancel: Function
    },
    methods: {
      ok() {
        this.$emit('close', this.onOk)
      },
      cancel() {
        this.$emit('close', this.onCancel)
      }
    }
  })
</script>

<style lang="sass" scoped>
  .basic-modal
</style>
