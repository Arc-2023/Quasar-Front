<template>
<q-page-container>
  <q-page class="" style="display: flex;flex-direction: column;">
    <q-list>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div v-for="(item,index) in notelist" :key="index" class="flex justify-center" v-show="item.show && item.showbypublic">
          <NoteCard
            v-if="item.ife"
            :id="item.id"
            :index =index
            :noteid="item.noteid"
            :title="item.title"
            :creator="item.creator"
            :content="item.content"
            :created-time="item.createdTime"
            :editTime="item.editTime"
            :tag="item.tag"
            :type="item.type"
            :views="item.view"
            @call-edit="edit"
            @call-delete="deletecard(index)"
          >
          </NoteCard>
        </div>
      </transition-group>
    </q-list>
    <q-page-sticky
      position="bottom-left"
      :offset="[18,18]">
      <q-btn flat v-ripple fab class=" bg-blue" v-morph:fab:group:300.resize="GroupModel" @click="this.GroupModel='card'">
        <q-icon name="add" ></q-icon>
        New
      </q-btn>
    </q-page-sticky>
    <q-page-sticky  :offset="[18,18]" position="bottom-left" v-show="GroupModel==='card'">
      <q-card
        v-morph:card:group:300.resize="GroupModel"
        class="mdi-border-radius bg-transparent"
        style="max-width: 200px;border-radius: 10px;backdrop-filter: blur(10px)"

      >
        <q-card-section class="text-h6">
          What's Your Point?
        </q-card-section>
        <q-card-section class="text-subtitle1">
          请输入你的信息：
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit="togglecardandsend">
            <q-input
              rounded
              outlined
              dense
              v-model="tmp.title"
              label="Note Title"
              hint="Type in Title"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input
              rounded
              outlined
              dense
              type="text"
              v-model="tmp.intro"
              label="Note Intro"
              hint="Type in Intro"
              lazy-rules
              :rules="[
          val => val !== null && val !== '' || 'Please type your intro',
        ]"
            />
            <q-btn flat label="否" v-close-popup @click="this.GroupModel='fab'"></q-btn>
            <q-btn flat label="是" v-close-popup type="submit"></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-sticky>

    <q-page-sticky
      :offset="[18,18]"
      position="bottom-right">
      <q-btn flat fab class="bg-blue" @click="this.rightcardmodel='rightcard'" v-morph:fab:group1:300.resize="rightcardmodel">
        <q-icon name="list"></q-icon></q-btn>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-right"
      :offset="[18,18]"
      v-show="rightcardmodel=='rightcard'">
      <q-card v-morph:rightcard:group1:300.resize="rightcardmodel"
              class="mdi-border-radius q-pa-sm"
              style="border-radius: 10px;backdrop-filter: blur(10px);background: transparent;max-width: 200px">
        <q-input
          rounded
          outlined
          dense
          v-model="search_content"
          label="Type to Search"
          class="self-stretch q-ma-sm"
        >
          <template v-slot:append>
            <q-icon style="overflow: hidden;border-radius: 50%" name="search" v-ripple @click="this.search"></q-icon>
          </template>
        </q-input>
        <div style="align-self: start" class="q-ma-sm flex reverse wrap">
          <div v-for="(data,index) in tagSet" :key="index" @click="this.activated_tag(index)"
          >
            <q-chip :outline="isactivated(data)" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s">
              <div>
                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <q-icon v-show="isactivated(data)" name="done" class="q-mr-sm "/>

                </transition>
                {{data}}
              </div>
            </q-chip>

          </div>

        </div>
        <div @click="switchpubliconly">
          <q-chip :outline="onlypublic===true" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s"
                  >
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <q-icon v-show="onlypublic===true" name="done" class="q-mr-sm "/>
            </transition>
            只显示public笔记
          </q-chip>
        </div>

        <q-card-actions>
          <q-btn color="white" flat text-color="black" @click="this.rightcardmodel='fab'">BACK</q-btn>
        </q-card-actions>
      </q-card>

    </q-page-sticky>
  </q-page>
<!--  <q-drawer-->
<!--    :breakpoint="700"-->
<!--    side="right"-->
<!--    v-model="this.drawerstate"-->
<!--    class="q-pa-sm align-left"-->
<!--    style="display: flex;flex-direction: column;align-items: center"-->
<!--  >-->
<!--   -->
<!--  </q-drawer>-->
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <q-dialog
    v-model="this.dialogstatus"
    >
    <q-card
      v-show="dialogstatus"
      class="mdi-border-radius"
      style="border-radius: 20px;width: 400px">
      <q-card-section
        class="text-h3">
        删除{{this.deltitle}}?
      </q-card-section>
      <q-card-section
        class="text-caption">
        删除不可恢复
      </q-card-section>
      <q-card-actions>
        <q-btn flat rounded @click="deletenote(this.deletingindex)">DEL</q-btn>
        <q-btn flat rounded @click="this.dialogstatus = !this.dialogstatus">BACK</q-btn>
      </q-card-actions>
    </q-card>

  </q-dialog>
  </transition>
</q-page-container>
</template>

<script>
import NoteCard from 'components/NoteCard.vue'
import { noteStore } from 'stores/note-store'
import { Notify, date } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { developStore } from 'stores/develop-store'

export default {
  name: 'NoteList',
  components: { NoteCard },
  setup () {
    const notestore = noteStore()
    const tagSet = ref([])
    const tagSetActivtivated = ref([])
    const router = useRouter()
    const notelist = ref([])
    const devestore = developStore()
    return {
      notestore,
      tagSet,
      router,
      tagSetActivtivated,
      notelist,
      devestore
    }
  },
  data () {
    return {
      GroupModel: 'fab',
      rightcardmodel: 'fab',
      tmp: {
        title: '',
        intro: ''
      },
      notenotshowing: [],
      menu_delete_morph: 'menu',
      drawerstate: false,
      search_content: '',
      dialogstatus: false,
      deletingindex: 0,
      deltitle: 'null',
      onlypublic: false
    }
  },
  methods: {
    switchpubliconly () {
      this.onlypublic = !this.onlypublic
      this.filtpublic()
    },
    filtpublic () {
      if (this.onlypublic) {
        this.notelist.forEach(e => {
          if (e.type != 'public') e.showbypublic = false
        })
      } else {
        this.notelist.forEach((e) => {
          e.showbypublic = true
        })
      }
    },
    intersection (entry) {
      const ind = entry.target.index
      setTimeout(() => {
        this.notelist[ind].show = false
      }, 400)
    },
    togglecardandsend () {
      this.notestore.addnote(this.tmp)
        .then(r => {
          this.GroupModel = 'fab'
        })
    },
    deletenote (index) {
      this.notestore.delnote(this.notelist[index].noteid)
        .then(r => {
          this.notelist[index].show = false
        })
    },
    edit (noteid) {
      this.router.push('/note/edit/' + noteid)
    },
    deletecard (index) {
      Notify.create('delete: ' + index)
      this.deletingindex = index
      this.dialogstatus = true
      this.deltitle = this.notelist[index].title
    },
    search () {
      if (this.search_content != null && this.search_content != '') {
        this.notelist.forEach(e => {
          if (e.title.indexOf(this.search_content) !== -1 || e.content.indexOf(this.search_content) !== -1) {
            e.show = true
          } else {
            e.show = false
          }
        })
      } else {
        this.notelist.forEach(e => {
          e.show = true
        })
      }
    },
    isactivated (tag) {
      return this.tagSetActivtivated.some(function (tagchecking) {
        return tagchecking === tag
      })
    },
    activated_tag (index) {
      const actingtag = this.tagSet[index]
      if (!this.tagSetActivtivated.some((tagchecking, index) => { return tagchecking === actingtag })) {
        this.tagSetActivtivated.push(actingtag)
      } else {
        for (let i = 0; i < this.tagSetActivtivated.length; ++i) {
          if (this.tagSetActivtivated[i] === actingtag) {
            this.tagSetActivtivated.splice(i, 1)
          }
        }
      }
      if (this.tagSetActivtivated.length > 0) {
        for (let i = 0; i < this.notelist.length; ++i) {
          const notenow = this.notelist[i]
          if (!this.tagSetActivtivated.some((item) => {
            return item == notenow.tag
          })) {
            this.notelist[i].show = false
          } else this.notelist[i].show = true
        }
      } else {
        this.notelist.forEach(e => { e.show = true })
      }
    }
  },
  computed: {
  },
  watch: {},
  mounted () {
    this.notestore.getnotecards()
      .then((res) => {
        res.forEach(e => {
          e.show = true
          e.ife = true
          e.showbypublic = true
        })
        this.notelist = res.sort((a, b) =>
          Date.parse(b.editTime) - Date.parse(a.editTime)
        )
        // console.log('notelist', this.notelist)
        setTimeout(() => {
          const cards = document.getElementsByClassName('mycard')
          for (let i = 0; i < cards.length; i++) {
            const element = cards[i]
            // addMouseOverListener(element)
            addMouseLeaveListener(element)
            addMouseEnterListener(element)
          }
          const a = []
          this.notelist.forEach((data) => [
            a.push(data.tag)
          ])
          this.tagSet = Array.from(new Set(a))
        }, 0)
      })
    // this.$emit('changeheaderstatus', 'thing')
    this.devestore.changeheaderstatus('note')
    function addMouseOverListener (element) {
      element.addEventListener('mousemove', (event) => {
        const rect = element.getBoundingClientRect()
        const rotateX = (event.x - (rect.x + rect.width / 2)) / 30
        const rotateY = (event.y - (rect.y + rect.height / 2)) / 30
        window.requestAnimationFrame(function () {
          element.style.transform =
            'translate(' + rotateX / 2 + 'px,' + rotateY + 'px) '
        })
      })
    }
    function addMouseLeaveListener (element) {
      element.addEventListener('mouseleave', (event) => {
        element.style.transform = 'rotateX(0) rotateY(0) translate(0,0)'
        element.getElementsByClassName('sepr')[0]
          .style
          .width = 10 + 'px'
        element
          .style
          .borderRadius = '30px'
      })
    }
    function addMouseEnterListener (element) {
      element.addEventListener('mouseenter', (event) => {
        element.getElementsByClassName('sepr')[0]
          .style
          .width = element.getElementsByClassName('tti')[0].getBoundingClientRect().width + 'px'
        element
          .style
          .borderRadius = '40px'
        const rect = element.getBoundingClientRect()
        const rotateX = (event.x - (rect.x + rect.width / 2)) / 30
        const rotateY = (event.y - (rect.y + rect.height / 2)) / 30
        window.requestAnimationFrame(function () {
          element.style.transform =
            'translate(' + rotateX / 2 + 'px,' + rotateY + 'px) '
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
