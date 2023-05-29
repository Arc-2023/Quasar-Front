<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <div style="display: flex;justify-items: center" class="q-ma-xl">
          <MdPreview :editorId="id" :modelValue="text" style="width: 80%"/>
          <MdCatalog class="" :editorId="id" :scrollElement="scrollElement" style="max-width: 20%" />
      </div>

<!--      <q-drawer-->
<!--         v-model="this.drawstatus"-->
<!--        side="right"-->
<!--        class="q-pa-sm align-left"-->
<!--        style="display: flex;flex-direction: column;align-items: center">-->

<!--      </q-drawer>-->

    </q-page>

  </q-page-container>

</template>
<script>
import { ref } from 'vue'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { noteStore } from 'stores/note-store'
import { useRouter } from 'vue-router'
const id = 'preview-only'
const text = ref('# Hello Editor')
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
      note: '',
      drawstatus: true
    }
  },
  methods: {
    getNote () {
      console.log('id', this.$route.params.id)
      this.notestore.getnote(this.$route.params.id)
        .then(r => {
          this.note = r
          this.text = this.note.content
          console.log(this.note)
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
