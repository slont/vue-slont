<template lang="pug">
  div.hello
    h1 {{ msg }}
    p
      | For a guide and recipes on how to configure / customize this project,<br>
      | check out the
      a(href="https://cli.vuejs.org" target="_blank" rel="noopener") vue-cli documentation
      | .
    h3 Installed CLI Plugins
    ul
      li: a(href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
            rel="noopener") babel
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'HelloWorld',
    props: {
      msg: String
    }
  })
</script>

<style lang="sass" scoped>
  h3
    margin: 40px 0 0
    color: $text-color
  ul
    list-style-type: none
    padding: 0
  li
    display: inline-block
    margin: 0 10px
  a
    color: #42b983
</style>
