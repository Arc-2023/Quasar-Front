<template>
  <q-page-container>
    <q-page class="q-pa-sm" style="max-height: 100%">
<!--        <mavon-editor-->
<!--          ref="md"-->
<!--          v-if = refstate-->
<!--          v-model="notelist[notereadingindex].content"-->
<!--          @imgAdd="$imgAdd"-->
<!--          @imgDel="$imgDel"-->
<!--          @save="savacontent"-->
<!--          v-morph:menuu:group1:250.resize="GroupModel"-->
<!--        >-->
<!--        </mavon-editor>-->
        <MdEditor
          ref="editor"
          @onUploadImg="imgAdd"
          @onSave="savacontent"
          v-model="this.note.content"
          style="height: 88vh"
          >
        </MdEditor>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" >
        <q-btn fab icon="list" color="primary" @click="morph1='card'" v-morph:fab:group:300.resize="morph1"  :loading="loading"></q-btn>
      </q-page-sticky>

      <q-page-sticky position="bottom-right" :offset="[18, 18]"  v-show="morph1=='card'" class="q-pa-sm">
        <q-card style="backdrop-filter: blur(10px);background-color: rgba(255,255,255,0.2)" v-morph:card:group:300.resize="morph1" >
          <q-input rounded standout bottom-slots v-model="note.title" label="Title" counter>
            <template v-slot:append>
              <q-icon name="close" @click="note.title = ''" class="cursor-pointer" />
            </template>
          </q-input>
          <q-input rounded standout bottom-slots v-model="note.tag" label="Tag" counter>
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
<!--          <q-input rounded standout bottom-slots v-model="note.type" label="Type" counter>-->
<!--            <template v-slot:append>-->
<!--              <q-icon name="close" @click="note.title = ''" class="cursor-pointer" />-->
<!--            </template>-->
<!--          </q-input>-->
          <q-card-actions>
            <q-btn @click="savacontent">保存</q-btn>
            <q-btn @click="morph1='fab'">返回</q-btn>
          </q-card-actions>
        </q-card>
      </q-page-sticky>
<!--      <q-page-sticky position="bottom-right"-->
<!--                     :offset="[28, 18]"-->
<!--                      class="z-top ">-->
<!--        <q-btn fab-mini icon="add" color="accent" @click="toggleAdd(false)" v-morph:right-stiky-btn:group2:200.resize="GroupModel1"></q-btn>-->
<!--        <div></div>-->
<!--      </q-page-sticky>-->
<!--      <q-page-sticky position="bottom-right" :offset="[18, 18]" class="z-top">-->
<!--      <q-card-->
<!--        v-morph:entercard:group2:200.resize="GroupModel1"-->
<!--        class="q-ma-md bg-secondary text-white z-top"-->
<!--        style="max-width: 200px; border-bottom-left-radius: 2em"-->
<!--      >-->
<!--        <q-card-section class="text-h6">-->
<!--          New Note?-->
<!--        </q-card-section>-->
<!--        <q-card-section class="text-subtitle1">-->
<!--          请输入你的信息：-->
<!--        </q-card-section>-->
<!--        <q-card-section>-->
<!--          <q-form class="q-gutter-md">-->
<!--            <q-input-->
<!--              filled-->
<!--              v-model="tmp.title"-->
<!--              label="Note Title"-->
<!--              hint="Type in Title"-->
<!--              lazy-rules-->
<!--              :rules="[ val => val && val.length > 0 || 'Please type something']"-->
<!--            />-->
<!--            <q-input-->
<!--              filled-->
<!--              type="text"-->
<!--              v-model="tmp.intro"-->
<!--              label="Note Intro"-->
<!--              hint="Type in Intro"-->
<!--              lazy-rules-->
<!--              :rules="[-->
<!--          val => val !== null && val !== '' || 'Please type your intro',-->
<!--        ]"-->
<!--            />-->
<!--          </q-form>-->
<!--        </q-card-section>-->
<!--        <q-card-actions align="right">-->
<!--          <q-btn flat label="Back" @click="toggleAndAdd(false)" />-->
<!--          <q-btn flat label="Create" @click="toggleAndAdd(true)" />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--      </q-page-sticky>-->
    </q-page>
<!--    <q-drawer-->
<!--      side="right"-->
<!--      v-model="toggle"-->
<!--      :width="200"-->
<!--      show-if-above-->
<!--      class="col q-ma-none q-py-sm"-->
<!--      :overlay=false-->
<!--      >-->

<!--    </q-drawer>-->
<!--    v-if="status"-->
<!--    <q-card-->
<!--          class="q-ma-md bg-secondary text-white absolute-center z-top"-->
<!--          style="max-width: 200px; border-bottom-left-radius: 2em"-->
<!--          v-morph:modifycard:group1:200.resize="GroupModel"-->
<!--        >-->
<!--          <q-card-section class="text-h6">-->
<!--            Change Note?-->
<!--          </q-card-section>-->
<!--          <q-card-section class="text-subtitle1">-->
<!--            请输入你的信息：-->
<!--          </q-card-section>-->
<!--          <q-card-section>-->
<!--            <q-form class="q-gutter-md">-->
<!--              <q-input-->
<!--                filled-->
<!--                v-model="this.note.title"-->
<!--                label="Note Title"-->
<!--                hint="Type in Title"-->
<!--                lazy-rules-->
<!--                :rules="[ val => val && val.length > 0 || 'Please type something']"-->
<!--              />-->
<!--              <q-input-->
<!--                filled-->
<!--                type="text"-->
<!--                v-model="this.note.intro"-->
<!--                label="Note Intro"-->
<!--                hint="Type in Intro"-->
<!--                lazy-rules-->
<!--                :rules="[-->
<!--          val => val !== null && val !== '' || 'Please type your intro',-->
<!--        ]"-->
<!--              />-->
<!--            </q-form>-->
<!--          </q-card-section>-->
<!--        <q-card-actions align="right" class="text-primary">-->
<!--          <q-btn flat label="否" v-close-popup @click="toggleModifyAndUpdate(false)"></q-btn>-->
<!--          <q-btn flat label="是" v-close-popup @click="toggleModifyAndUpdate(true)"></q-btn>-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--&lt;!&ndash;    v-if="status"&ndash;&gt;-->
<!--    <q-card  v-morph:deletecard:group1:240.resize="GroupModel"  class="absolute-center z-top" v-if="this.GroupModel==='deletecard'">-->
<!--      <q-card-section class="bg-amber ">-->
<!--        <div class="text-h6">你确定要删除{{this.notelist[this.tmp.index].title}}吗？</div>-->
<!--        <div class="text-subtitle2 text-red">这是不可恢复的</div>-->
<!--      </q-card-section>-->
<!--      <q-card-actions align="right" class="text-primary">-->
<!--        <q-btn flat label="否" v-close-popup @click="toggledeldialog(false)"></q-btn>-->
<!--        <q-btn flat label="是" v-close-popup @click="toggledeldialog(true)"></q-btn>-->
<!--      </q-card-actions>-->
<!--    </q-card>-->
  </q-page-container>
</template>

<script>
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref, defineComponent } from 'vue'
import { noteStore } from 'stores/note-store'
import { userStore } from 'stores/user-store'
export default defineComponent({
  name: 'Note',
  components: { MdEditor },
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
