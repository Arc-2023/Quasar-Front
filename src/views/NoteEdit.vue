<template>
  <q-page-container>
    <q-page class="q-pa-sm" style="max-height: 100%">
        <MdEditor
          ref="editor"
          @onUploadImg="imgAdd"
          @onSave="savacontent"
          v-model="this.note.content"
          style="height: 88vh"
          :theme="dark"
          >
        </MdEditor>
      <q-page-sticky position="bottom-left" :offset="[18, 18]" class="z-top">
        <DarkSwitcher @call-switch="this.switchdark"></DarkSwitcher>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" >
        <q-btn fab icon="list" color="primary" @click="morph1='card'" v-morph:fab:group:300.resize="morph1"  :loading="loading"></q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]"  v-show="morph1=='card'" class="q-pa-none">
        <q-card style="backdrop-filter: blur(10px);background-color: rgba(255,255,255,0.4);border-radius: 2rem" v-morph:card:group:300.resize="morph1"
                class="q-pa-sm mdi-border-radius" >
          <q-form @submit="savacontent">
            <q-input rounded standout bottom-slots v-model="note.title" label="Title" counter
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']">
              <template v-slot:append>
                <q-icon name="close" @click="note.title = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input rounded standout bottom-slots v-model="note.tag" label="Tag" counter
                     :rules="[ val => val && val.length > 0 || 'Please type something']">
              <template v-slot:append>
                <q-icon name="close" @click="note.title = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-select  standout
                       v-model="note.type"
                       :options="options"
                       rounded label="Type in your type"
                       transition-show="flip-up"
                       transition-hide="flip-down"></q-select>
            <q-card-actions>
              <q-btn flat type="submit" rounded>保存</q-btn>
              <q-btn flat @click="morph1='fab'" rounded>返回</q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page-sticky>
    </q-page>
  </q-page-container>
</template>

<script>
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref, defineComponent } from 'vue'
import { noteStore } from 'stores/note-store'
import { userStore } from 'stores/user-store'
import DarkSwitcher from 'components/DarkSwitcher.vue'
export default defineComponent({
  name: 'Note',
  components: { DarkSwitcher, MdEditor },
  setup () {
    const toggle = ref(false)
    const GroupModel = ref('menuu')
    const GroupModel1 = ref('right-stiky-btn')
    const notestore = noteStore()
    const userstore = userStore()
    const note = ref('')
    const loading = ref(false)
    return {
      toggle,
      GroupModel,
      GroupModel1,
      notestore,
      userstore,
      note,
      loading
    }
  },
  methods: {
    switchdark () {
      this.dark = this.dark == 'dark' ? 'light' : 'dark'
      console.log(this.dark)
    },
    switchloading (booll) {
      this.loading = booll
    },
    async imgAdd (files, callback) {
      console.log(files)
      this.loading = true
      const arr = []
      for (const fileone of files) {
        const formdata = new FormData()
        formdata.append('file', fileone)
        await this.notestore.uploadimage(formdata).then(res => {
          arr.push('https://spring.220608.xyz/getImage/' + res)
          console.log(res)
        })
      }
      callback(arr)
      this.loading = false
    },
    $imgDel (pos) {
      this.delimage(this.imgs[pos])
    },
    delimage (imgname) {
      this.notestore.deleteimage(imgname)
    },
    savacontent () {
      // eslint-disable-next-line eqeqeq
      this.loading = true
      this.notestore.updatenote(this.note)
        .then(e => this.loading = false)
        .catch(e => this.loading = false)
      console.log('note:', this.note)
    },
    getNote () {
      this.loading = true
      this.notestore.getnote(this.$route.params.id)
        .then(r => {
          this.note = r
          this.loading = false
        })
        .catch(e => this.loading = false)
    }
  },
  data () {
    return {
      dark: 'light',
      morph1: 'fab',
      changelising: 0,
      notereadingindex: 0,
      refstate: false,
      deleting: '',
      status: true,
      dialogtoggle: false,
      options: ['private', 'public']
    }
  },
  mounted () {
    this.getNote()
  }
})
</script>

<style scoped>

</style>
