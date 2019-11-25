<template lang="pug">
  transition(:name="animation")
    div.v-modal(v-if="active" :class="customClass" tabindex="-1")
      div.v-modal-backdrop(@click="close")
      button.v-modal-close.large(v-if="closable" type="button" @click="close")

      component.v-modal-card(:is="component"
        v-bind="props"
        v-on="events"
        @close="closeForce"
        @update:closable="setClosable"
        @update:cb-blocked="setCallbackBlocked")
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      component: [Object, Function],
      props: Object,
      events: Object,
      width: {
        type: String,
        default: '960'
      },
      animation: {
        type: String,
        default: 'zoom-out'
      },
      scroll: {
        type: String,
        default: 'clip',
        validator: (value) => ['clip', 'keep'].includes(value)
      },
      customClass: String
    },
    data() {
      return {
        active: false,
        forceClose: false,
        closable: true,
        callback: () => {},
        callbackBlocked: () => {}
      }
    },
    computed: {
      uid(): number {
        return (this as any)._uid
      },
      isLast(): boolean {
        return this.$store.getters['modal/isLast'](this.uid)
      }
    },
    async created() {
      this.$store.commit('modal/push', this.uid)
      const query = Object.assign({}, this.$route.query, {modal: this.uid})
      await this.$router.push({query})
    },
    mounted() {
      window.addEventListener('popstate', this.onBack)
      document.addEventListener('keyup', this.keyPress)
      document.body.appendChild(this.$el)
      this.active = true
      if ('clip' === this.scroll) {
        document.documentElement.classList.add('clipped')
      } else {
        document.body.classList.add('noscroll')
      }
    },
    beforeDestroy() {
      document.body.classList.remove('noscroll')
      document.documentElement.classList.remove('clipped')
      document.removeEventListener('keyup', this.keyPress)
      window.removeEventListener('popstate', this.onBack)
    },
    methods: {
      async close() {
        if (!this.closable) return

        await this.$router.back()
      },
      closeForce(callback = () => {}) {
        this.forceClose = true
        this.callback = callback
        this.$router.back()
      },
      setClosable(closable = true) {
        this.closable = closable
      },
      setCallbackBlocked(callback = () => {}) {
        this.callbackBlocked = callback
      },
      onBack() {
        const uid = this.uid
        if (this.active && this.isLast && uid !== Number(this.$route.query.modal)) {
          if (this.closable || this.forceClose) {
            this.active = false
            this.$store.commit('modal/remove', uid)
            this.callback()
            setTimeout(() => {
              this.$destroy()
              if ('undefined' !== typeof this.$el.remove) {
                this.$el.remove()
              } else if ('undefined' !== typeof this.$el.parentNode) {
                this.$el.parentNode!.removeChild(this.$el)
              }
            }, 150)
          } else {
            this.$router.forward()
            this.callbackBlocked()
          }
        }
      },
      async keyPress(event: KeyboardEvent) {
        // Esc key
        if ([event.key, event.keyCode].includes(27) && this.isLast) {
          await this.close()
        }
      }
    }
  })
</script>

<style lang="sass">
  .overlay
    position: absolute
    bottom: 0
    left: 0
    right: 0
    top: 0

  .v-modal
    @extend .overlay
    align-items: center
    display: flex
    flex-direction: column
    justify-content: center
    overflow: hidden
    position: fixed
    z-index: 40
    &.is-full-screen
      .v-modal-close
        display: none
      .v-modal-backdrop
        opacity: .5
        pointer-events: none
      .v-modal-card-foot
        border-radius: 0
      .v-modal-card
        height: 100vh
        width: 100%
        > :first-child
          border-top-left-radius: 0
          border-top-right-radius: 0
        > :last-child
          border-bottom-left-radius: 0
          border-bottom-right-radius: 0
    &.delete-modal
      .v-modal-card-foot
        flex-direction: row-reverse
        align-items: baseline

    &-backdrop
      @extend .overlay
      background-color: $modal-backdrop-color

    &-card
      max-height: 100vh
      overflow: auto
      position: relative
      width: calc(100% - 1.5rem)
      max-width: 960px
      > :first-child
        border-top-left-radius: $modal-radius
        border-top-right-radius: $modal-radius
      > :last-child
        border-bottom-left-radius: $modal-radius
        border-bottom-right-radius: $modal-radius

    &-close
      position: fixed
      right: 20px
      top: 20px
      background: none
      height: 32px
      max-height: 32px
      min-height: 32px
      width: 32px
      max-width: 32px
      min-width: 32px
      -moz-appearance: none
      -webkit-appearance: none
      //background-color: rgba($scheme-invert, 0.2)
      border: none
      border-radius: 50%
      cursor: pointer
      pointer-events: auto
      display: inline-block
      flex-grow: 0
      flex-shrink: 0
      font-size: 0
      outline: none
      vertical-align: top
      &::before,
      &::after
        //background-color: $scheme-main
        content: ""
        display: block
        left: 50%
        position: absolute
        top: 50%
        transform: translateX(-50%) translateY(-50%) rotate(45deg)
        transform-origin: center center
      &::before
        height: 2px
        width: 50%
      &::after
        height: 50%
        width: 2px

    &-card
      display: flex
      flex-direction: column
      max-height: 100vh
      overflow: hidden
      -ms-overflow-y: visible

    &-card-head,
    &-card-foot
      position: relative
      display: flex
      flex-shrink: 0
      justify-content: space-around
      align-items: center
      padding: $modal-padding
      background-color: $modal-bg-color

    &-card-title
      flex-grow: 1
      flex-shrink: 0
      text-align: center
      font-weight: bold

    &-card-body
      flex-grow: 1
      flex-shrink: 1
      padding: $modal-padding
      background-color: $modal-bg-color
      overflow: auto
</style>
