<template lang="pug">
  div#app
    div#nav
      router-link(to="/") Home
      | |
      router-link(to="/about") About
    router-view
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({})
</script>

<style lang="sass">
  @import "assets/sass/global.sass"

  #app
    text-align: center
    #nav
      padding: 30px
      a
        font-weight: bold
        color: #2c3e50
        &.router-link-exact-active
          color: #42b983
</style>
