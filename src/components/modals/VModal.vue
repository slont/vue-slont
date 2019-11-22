<template lang="pug">
  transition(:name="animation")
    div.v-modal(v-if="active" :class="customClass" tabindex="-1")
      div.v-modal-backdrop(@click="close")
      button.v-modal-close.large(v-if="canCancel" type="button" @click="close")

      component.v-modal-card(:is="component" v-bind="props" @close="closeForce")
</template>

<script lang="ts">
  import Vue, {PropType} from 'vue'

  export default Vue.extend({
    props: {
      vm: Object as PropType<Vue>,
      component: [Object, Function],
      props: Object,
      width: {
        type: String,
        default: '960'
      },
      animation: {
        type: String,
        default: 'zoom-out'
      },
      canCancel: {
        type: Boolean,
        default: true
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
        callback: () => {}
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
    async beforeMount() {
      window.addEventListener('popstate', this.onBack)
      document.addEventListener('keyup', this.keyPress)
      document.body.appendChild(this.$el)
    },
    mounted() {
      this.active = true
      if (this.scroll === 'clip') {
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
        if (!this.canCancel) return

        await this.$router.back()
      },
      closeForce(callback = () => {}) {
        this.forceClose = true
        this.callback = callback
        this.$router.back()
      },
      onBack() {
        const uid = this.uid
        if (this.active && this.isLast && uid !== Number(this.$route.query.modal)) {
          if (this.canCancel || this.forceClose) {
            this.active = false
            this.$store.commit('modal/remove', uid)
            this.callback()
            setTimeout(() => {
              this.$destroy()
              if (typeof this.$el.remove !== 'undefined') {
                this.$el.remove()
              } else if (typeof this.$el.parentNode !== 'undefined') {
                this.$el.parentNode!.removeChild(this.$el)
              }
            }, 150)
          } else {
            this.$router.forward()
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

    &-backdrop
      @extend .overlay
      background-color: $modal-backdrop-color

    &-card
      max-height: 100vh
      overflow: auto
      position: relative
      width: 100%
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
      justify-content: flex-start
      align-items: center
      padding: $modal-padding
      background-color: $modal-bg-color

    &-card-title
      flex-grow: 1
      flex-shrink: 0

    &-card-body
      flex-grow: 1
      flex-shrink: 1
      padding: $modal-padding
      background-color: $modal-bg-color
      overflow: auto
</style>
