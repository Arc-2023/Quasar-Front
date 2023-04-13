<template>
  <q-page-container>
    <q-page padding>
      <div class="q-pa-none">
        <mavon-editor
          ref="md"
          v-if = refstate
          v-model="notelist[notereadingindex].content"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          @save="savacontent"
          v-morph:menuu:group1:250.resize="GroupModel"
        >
        </mavon-editor>
      </div>
      <q-page-sticky position="bottom-left" :offset="[18, 18]" class="z-top">
        <q-btn fab icon="list" color="accent" @click="toggledrawer"></q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-right"
                     :offset="[18, 18]"
                      class="z-top ">
        <q-btn fab icon="add" color="accent" @click="toggleAdd(false)" v-morph:right-stiky-btn:group2:200.resize="GroupModel1"></q-btn>
        <div></div>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]" class="z-top">
      <q-card
        v-morph:entercard:group2:200.resize="GroupModel1"
        class="q-ma-md bg-secondary text-white z-top"
        style="max-width: 200px; border-bottom-left-radius: 2em"
      >
        <q-card-section class="text-h6">
          New Note?
        </q-card-section>
        <q-card-section class="text-subtitle1">
          请输入你的信息：
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              filled
              v-model="tmp.title"
              label="Note Title"
              hint="Type in Title"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              filled
              type="text"
              v-model="tmp.intro"
              label="Note Intro"
              hint="Type in Intro"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Please type your intro',
        ]"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Back" @click="toggleAndAdd(false)" />
          <q-btn flat label="Create" @click="toggleAndAdd(true)" />
        </q-card-actions>
      </q-card>
      </q-page-sticky>
    </q-page>
    <q-drawer
      side="left"
      v-model="toggle"
      :width="200"
      show-if-above
      >

      <q-scroll-area class="fixed-full" >
        <div>
          <q-intersection
            once
            v-for="(item,index) in notelist"
            :key="index"
            transition="flip-right"
            @click="watchnote(index)"
          >
            <template v-slot:left>
              <q-avatar icon="fingerprint"></q-avatar>
            </template>
            <q-item
              clickable
              v-ripple
              >
              <q-item-section side>
                <q-avatar color="blue" text-color="white" size="md">
                  {{item.id }}
                </q-avatar>
              </q-item-section>
              <q-item-section class="justify-sm-start">
                <q-item-label class="text-blue-14">{{item.title}}</q-item-label>
                <q-item-label caption>{{item.intro}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-menu
              touch-position
              context-menu
            >
              <div>
                <q-list dense style="min-width: 50px" class="justify-sm-start">
                  <q-item clickable v-close-popup  dense @click="this.changeModelAndToggleDialog(index)">
                    <q-item-section side><q-avatar icon="delete" size="md"></q-avatar></q-item-section>
                    <q-item-section class="text-red-14">Delete</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup  dense @click="this.changeModelAndModify(index)">
                    <q-item-section side><q-avatar icon="settings" size="md"></q-avatar></q-item-section>
                    <q-item-section class="text-blue-14">Modify</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>

          </q-intersection>
        </div>

      </q-scroll-area>

    </q-drawer>
<!--    v-if="status"-->
    <q-card
          class="q-ma-md bg-secondary text-white absolute-center z-top"
          style="max-width: 200px; border-bottom-left-radius: 2em"
          v-morph:modifycard:group1:200.resize="GroupModel"
        >
          <q-card-section class="text-h6">
            Change Note?
          </q-card-section>
          <q-card-section class="text-subtitle1">
            请输入你的信息：
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="tmp.title"
                label="Note Title"
                hint="Type in Title"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
              />
              <q-input
                filled
                type="text"
                v-model="tmp.intro"
                label="Note Intro"
                hint="Type in Intro"
                lazy-rules
                :rules="[
          val => val !== null && val !== '' || 'Please type your intro',
        ]"
              />
            </q-form>
          </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="否" v-close-popup @click="toggleModifyAndUpdate(false)"></q-btn>
          <q-btn flat label="是" v-close-popup @click="toggleModifyAndUpdate(true)"></q-btn>
        </q-card-actions>
      </q-card>
<!--    v-if="status"-->
    <q-card  v-morph:deletecard:group1:240.resize="GroupModel"  class="absolute-center z-top">
      <q-card-section class="bg-amber ">
        <div class="text-h6">你确定要删除{{this.notelist[this.notereadingindex].title}}吗？</div>
        <div class="text-subtitle2 text-red">这是不可恢复的</div>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="否" v-close-popup @click="toggledeldialog(false)"></q-btn>
        <q-btn flat label="是" v-close-popup @click="toggledeldialog(true)"></q-btn>
      </q-card-actions>
    </q-card>

  </q-page-container>

</template>

<script>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref, defineComponent } from 'vue'
import { noteStore } from 'stores/note-store'
import { userStore } from 'stores/user-store'
export default defineComponent({
  name: 'Note',
  setup () {
    const toggle = ref(false)
    const GroupModel = ref('menuu')
    const GroupModel1 = ref('right-stiky-btn')
    const notestore = noteStore()
    const userstore = userStore()
    return {
      toggle,
      GroupModel,
      GroupModel1,
      notestore,
      userstore
    }
  },
  methods: {
    toggleAdd () {
      this.GroupModel1 = this.GroupModel1 === 'right-stiky-btn' ? 'entercard' : 'right-stiky-btn'
    },
    watchnote (index) {
      this.notereadingindex = index
    },
    toggleModifyAndUpdate (b) {
      if (b) {
        this.notelist[this.tmp.index].title = this.tmp.title
        this.notelist[this.tmp.index].intro = this.tmp.intro
        if (!this.notestore.updatenote(this.notelist[this.changelising])) {
          this.getAllnotes()
        }
      }
      this.GroupModel = 'menuu'
    },
    changeModelAndModify (index) {
      this.status = true
      this.tmp.title = this.notelist[index].title
      this.tmp.intro = this.notelist[index].intro
      this.tmp.index = index
      this.GroupModel = 'modifycard'
      this.changelising = index
    },
    toggleAndAdd (b) {
      // eslint-disable-next-line eqeqeq
      if (b) {
        this.notestore.addnote(this.tmp)
          .then(r => {
            this.getAllnotes()
          })
      }
      // eslint-disable-next-line eqeqeq
      this.GroupModel1 = this.GroupModel1 === 'right-stiky-btn' ? 'entercard' : 'right-stiky-btn'
    },
    changeModelAndToggleDialog (index) {
      this.status = true
      this.GroupModel = 'deletecard'
      this.tmp.index = index
    },
    toggledeldialog (b) {
      if (b) {
        const id = this.notelist[this.notereadingindex].id
        this.GroupModel = 'menuu'
        this.notestore.delnote(id)
          .then(r => {
            setTimeout(() => {
              this.watchnote(this.notereadingindex - 1)
              this.notelist.splice(this.notereadingindex+1, 1)
            }, 400)
          })
      }
      this.GroupModel = 'menuu'
    },
    toggledrawer () {
      this.toggle = !this.toggle
    },
    $imgAdd (pos, $file) {
      this.uploadimage(pos, $file)
    },
    $imgDel (pos) {
      this.delimage(this.imgs[pos])
    },
    uploadimage (pos, $file) {
      const formdata = new FormData()
      formdata.append('file', $file)
      this.notestore.uploadimage(formdata).then(res => {
        this.$refs.md.$img2Url(pos, 'https://spring.220608.xyz/getImage/' + res)
      })
    },
    delimage (imgname) {
      this.notestore.deleteimage(imgname)
    },
    savacontent () {
      // eslint-disable-next-line eqeqeq
      this.notestore.updatenote(this.notelist[this.notereadingindex])
    },
    getAllnotes () {
      this.notestore.getallnotes()
        .then(res => {
          if (res !== undefined && res.length !== 0) {
            this.notelist = ''
            const ll = res
            console.log(ll)
            this.notelist = ll
            console.log(this.notelist)
          }
        })
    }
  },
  data: function () {
    return {
      drawerif: false,
      changelising: 0,
      notereadingindex: 0,
      refstate: false,
      deleting: '',
      status: true,
      data: {
        creater: '',
        createdTime: '',
        lastedittime: '',
        content: '',
        subfield: false,
        imgs: {},
        id: '',
        title: '',
        intro: '',
        index: ''
      },

      dialogtoggle: false,

      tmp: {
        title: '',
        intro: '',
        index: ''
      },
      notelist: [
        {
          creater: 'none',
          createdTime: Date.now(),
          lastedittime: 'Date.now()',
          content: 'none',
          subfield: false,
          imgs: {},
          id: '',
          title: 'none',
          intro: 'none'
        }
      ]
    }
  },
  async mounted () {
    // await this.note.getnote(1).then((res) => {
    //  this.setData(res)
    // })
    this.getAllnotes()
    setTimeout(() => {
      this.refstate = true
      this.drawerif = true
    }, 300)
  }

})
</script>

<style scoped>

</style>
