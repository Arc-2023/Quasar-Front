<template>
<q-page-container>
  <q-page class="" style="display: flex;flex-direction: column;">
    <q-list>
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-for="(item,index) in notelist" :key="index" class="flex justify-center" v-show="item.show" >
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
      position="bottom-left">
      <q-btn fab class="q-ma-sm bg-blue"  v-morph:fab:group:200="GroupModel" @click="this.GroupModel='card'">
        <q-icon name="add" ></q-icon></q-btn>

    </q-page-sticky>
    <q-page-sticky   position="bottom-left" v-show="GroupModel=='card'">

      <q-card
        class="q-ma-md bg-secondary text-white z-top"
        style="max-width: 200px; border-bottom-left-radius: 2em"
        v-morph:card:group:200="GroupModel"
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
          <q-btn flat label="否" v-close-popup @click="this.GroupModel='fab'"></q-btn>
          <q-btn flat label="是" v-close-popup @click="togglecardandsend"></q-btn>
        </q-card-actions>
      </q-card>
    </q-page-sticky>

    <q-page-sticky
      position="bottom-right">
      <q-btn fab class="q-ma-sm bg-blue" @click="this.drawerstate = !this.drawerstate">
        <q-icon name="add" ></q-icon></q-btn>
    </q-page-sticky>
  </q-page>
  <q-drawer
    :breakpoint="700"
    side="right"
    v-model="this.drawerstate"
    class="q-pa-sm align-left"
    style="display: flex;flex-direction: column;align-items: center"
  >
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
        <q-badge  rounded  class="q-mr-sm text-body2 cursor-pointer " v-ripple style="transition: all .5s">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <q-icon v-show="isactivated(data)" name="done" class="q-mr-sm "/>
          </transition>
          {{data}}
        </q-badge>
      </div>
    </div>
  </q-drawer>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
  <q-dialog
    v-if="dialogstatus"
    v-model="this.dialogstatus"
    :position="'bottom'"
    >
    <q-card
      style="width: 400px">
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
import { userStore } from 'stores/user-store'

export default {
  name: 'NoteList',
  components: { NoteCard },
  setup () {
    const notestore = noteStore()
    const tagSet = ref([])
    const tagSetActivtivated = ref([])
    const router = useRouter()
    const notelist = ref([])
    return {
      notestore,
      tagSet,
      router,
      tagSetActivtivated,
      notelist
    }
  },
  data () {
    return {
      GroupModel: 'fab',
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
      deltitle: 'null'
    }
  },
  methods: {
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
      Notify.create('edit: ' + noteid)
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

      // const cards = document.getElementsByClassName('mycard')
      // for (let i = 0; i < cards.length; ++i) {
      //   console.log(cards[i])
      //   if (!this.tagSetActivtivated.some(item => {
      //     return item === cards[i].tag
      //   })) {
      //     cards[i].display = 'none'
      //   }
      // }

      // this.notelist = this.notenotshowing !== [] ? this.notelist?.concat(this.notenotshowing) : this.notelist
      // this.notenotshowing = []
      //
      // if (this.tagSetActivtivated.length > 0) {
      //   for (let i = 0; i < this.notelist.length; ++i) {
      //     if (!this.tagSetActivtivated.some((item, index) => {
      //       return item === this.notelist[i].tag
      //     })) {
      //       this.notenotshowing = []
      //       this.notenotshowing.push(this.notelist[i].tag)
      //       this.notelist.splice(i, 1)
      //     }
      //   }
      // }
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
        })
        this.notelist = res.sort((a, b) =>
          Date.parse(b.editTime) - Date.parse(a.editTime)
        )
        // console.log('notelist', this.notelist)
        setTimeout(() => {
          const cards = document.getElementsByClassName('mycard')
          for (let i = 0; i < cards.length; i++) {
            const element = cards[i]
            addMouseOverListener(element)
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
      })
    }
  }
}
</script>

<style scoped>

</style>
