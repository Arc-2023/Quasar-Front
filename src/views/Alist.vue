<template>
  <q-page-container class="q-ma-none q-pa-none">
    <q-page class="flex flex-center overflow-auto q-ma-none q-pa-none">
      <div class="container q-ma-none q-pa-none" style="width: 100%;height: 86vh;min-height: 100%"  >
        <q-resize-observer @resize="onResize" />
        <iframe
          ref="iframe"
          src="https://alist.220608.xyz"
          style="position: absolute; top: 0; left: 0; width: 100%; border: none; z-index: 1;"
        />
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: 'alist',
  data () {
    return {
      headerHeight: 0,
      footerHeight: 0
    }
  },
  mounted () {
    /* this.headerHeight = this.$refs.layout.$el.querySelector('.q-header').offsetHeight
    this.footerHeight = this.$refs.layout.$el.querySelector('.q-footer').offsetHeight */
    this.resizeIframe()
  },
  methods: {
    onResize ({ height }) {
      this.resizeIframe()
    },
    resizeIframe () {
      const iframe = this.$refs.iframe
      const container = iframe.parentNode
      const containerHeight = container.offsetHeight
      const iframeHeight = containerHeight - this.headerHeight - this.footerHeight
      iframe.style.height = iframeHeight + 'px'
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
