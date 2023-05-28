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
      <q-page-sticky position="bottom-right" :offset="[28, 18]" class="z-top">
        <q-btn fab-mini icon="list" color="accent" @click="toggledrawer"></q-btn>
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
    <q-drawer
      side="right"
      v-model="toggle"
      :width="200"
      show-if-above
      class="col q-ma-none q-py-sm"
      :overlay=false
      >
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
      <q-input rounded standout bottom-slots v-model="note.type" label="Type" counter>
        <template v-slot:append>
          <q-icon name="close" @click="note.title = ''" class="cursor-pointer" />
        </template>
      </q-input>

    </q-drawer>
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
<!--                v-model="tmp.title"-->
<!--                label="Note Title"-->
<!--                hint="Type in Title"-->
<!--                lazy-rules-->
<!--                :rules="[ val => val && val.length > 0 || 'Please type something']"-->
<!--              />-->
<!--              <q-input-->
<!--                filled-->
<!--                type="text"-->
<!--                v-model="tmp.intro"-->
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
    return {
      toggle,
      GroupModel,
      GroupModel1,
      notestore,
      userstore,
      note
    }
  },
  methods: {
    toggledrawer () {
      this.toggle = !this.toggle
    },
    imgAdd (files, callback) {
      console.log(files)
      const arr = []
      for (const fileone of files) {
        const formdata = new FormData()
        formdata.append('file', fileone)
        this.notestore.uploadimage(formdata).then(res => {
          arr.push('https://spring.220608.xyz/getImage/' + res)
          console.log(res)
        })
      }
      setTimeout(function () {
        callback(arr)
      }, 1000)
    },
    $imgDel (pos) {
      this.delimage(this.imgs[pos])
    },
    delimage (imgname) {
      this.notestore.deleteimage(imgname)
    },
    savacontent () {
      // eslint-disable-next-line eqeqeq
      this.notestore.updatenote(this.note)
      console.log('note:', this.note)
    },
    getNote () {
      this.notestore.getnote(this.$route.params.id)
        .then(r => {
          this.note = r
        })
    }
  },
  data () {
    return {
      changelising: 0,
      notereadingindex: 0,
      refstate: false,
      deleting: '',
      status: true,
      dialogtoggle: false
    }
  },
  mounted () {
    this.getNote()
  }

})
</script>

<style scoped>

</style>
