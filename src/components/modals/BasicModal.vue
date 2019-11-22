<template lang="pug">
  div.basic-modal
    header.v-modal-card-head(v-if="title")
      p.v-modal-card-title(v-html="title")
    section.v-modal-card-body
      p(v-if="message" v-html="message")
    footer.v-modal-card-foot
      v-button.btn-ok(v-if="okText" :onclick="ok"): span {{ okText }}
      v-button.btn-cancel(v-if="cancelText" :onclick="cancel"): span {{ cancelText }}
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
