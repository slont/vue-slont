<template lang="pug">
  div.basic-modal(:class="customClass")
    header.v-modal-card-head(v-if="title")
      p.v-modal-card-title(v-html="title")
    section.v-modal-card-body(v-if="message")
      p(v-html="message")
    footer.v-modal-card-foot(v-if="okText || cancelText")
      v-button.btn-cancel(v-if="cancelText" :class="cancelClass" :onclick="cancel") {{ cancelText }}
      v-button.btn-ok(v-if="okText" :class="okClass" :onclick="ok") {{ okText }}
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      title: String,
      message: String,
      okText: String,
      okClass: String,
      onOk: Function,
      cancelText: String,
      cancelClass: String,
      onCancel: Function,
      customClass: String
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
    border-radius: 12px
    .v-modal-card-body
      p
        font-weight: bold
        text-align: center
    .v-modal-card-foot
      border-top: none
      margin-top: -1px
      .button-cancel
        border: none
        color: darkgrey
        padding-bottom: 0
</style>
