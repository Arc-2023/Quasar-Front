<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <div style="display: flex;justify-items: center" class="">
          <MdPreview :editorId="id" :modelValue="text" style="overflow: hidden;border-radius: 20px"/>
      </div>

<!--      <q-drawer-->
<!--         v-model="this.drawstatus"-->
<!--        side="right"-->
<!--        class="q-pa-sm align-left"-->
<!--        style="display: flex;flex-direction: column;align-items: center">-->

<!--      </q-drawer>-->
      <q-page-sticky
        position="bottom-right">
        <q-btn :loading="loading" flat fab class="q-ma-sm bg-blue" @click="this.drawstatus = !this.drawstatus">
          <q-icon name="add" ></q-icon></q-btn>
      </q-page-sticky>

    </q-page>
    <q-drawer class="q-pa-sm" side="right" v-model="drawstatus" breakpoint="800">
      <MdCatalog class="" :editorId="id" :scrollElement="scrollElement" style="" />
    </q-drawer>
  </q-page-container>

</template>
<script>
import { ref } from 'vue'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { noteStore } from 'stores/note-store'
import { useRouter } from 'vue-router'
const id = 'preview-only'
const text = ref('')
const scrollElement = document.documentElement

export default {
  name: 'NotePriview',
  components: { MdCatalog, MdPreview },
  setup () {
    const notestore = noteStore()
    const router = useRouter()
    return {
      notestore, router, MdPreview, id, text, scrollElement
    }
  },
  data () {
    return {
      loading: true,
      note: '',
      drawstatus: false
    }
  },
  methods: {
    getNote () {
      console.log('id', this.$route.params.id)
      this.notestore.getnote(this.$route.params.id)
        .then(r => {
          this.note = r
          this.text = this.note.content
          this.loading = false
        })
    }
  },
  mounted () {
    this.getNote()
  }
}
</script>

<style scoped>

</style>
