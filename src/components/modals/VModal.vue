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
