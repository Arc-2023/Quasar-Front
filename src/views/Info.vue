<template>
<q-page-container>
  <q-page class="q-pa-md column items-center">
        <div v-for="(item) in cardlist" :key="item.id"  class="q-pa-md full-width" style=""
          @click="opendialog(item)">
          <ProgressCard
            :creater="item.creater"
            :developer="item.creater"
            :intro="item.intro"
            :progress="item.progress"
            :status="item.status"
            :title="item.title"
          >
          </ProgressCard>
        </div>
<!--    <ProgressCard/>-->

    <q-page-sticky :offset="[18,18]" position="bottom-left" v-if="this.userstore.getRole=='SuperUser'">
      <q-btn fab class="bg-green-2"  v-morph:btn:group:300.resize="GroupModel" @click="this.GroupModel='card'">
        <q-icon name="add"/>
        NEW
      </q-btn>
    </q-page-sticky>
    <q-page-sticky :offset="[18,18]" position="bottom-left" v-show="GroupModel==='card'">
      <q-card
        v-morph:card:group:300.resize="GroupModel"
        class="mdi-border-radius bg-transparent"
        style="max-width: 200px;border-radius: 10px;backdrop-filter: blur(10px)"
      >
        <q-card-section>
          <q-form class="q-gutter-md" @submit="addCard">
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
            <q-btn flat label="否" v-close-popup @click="this.GroupModel='btn'"></q-btn>
            <q-btn flat label="是" v-close-popup type="submit"></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page-sticky>
  </q-page>
  <q-dialog v-model="this.dialog" persistent>
    <q-card style="width: 70%" class="q-pa-lg">
      <q-form class="q-gutter-sm" @submit="changecard(editdata)">
        <q-slider
          v-model="editdata.progress"
          label>
        </q-slider>
        <q-input rounded outlined dense type="text"
                 label="Title"
                 v-model="editdata.title">
        </q-input>
        <q-editor v-model="editdata.intro" :square="false" dense >
        </q-editor>
        <q-btn label="修改" type="submit" rounded color="blue-5"/>
        <q-btn label="返回" rounded color="grey-5" @click="this.dialog=false"/>
        <q-btn label="ACPT" rounded color="green-5" @click="acptdata"></q-btn>
        <q-btn label="删除" rounded color="red-5" @click="delcard(editdata.id)"></q-btn>
      </q-form>
    </q-card>
  </q-dialog>
</q-page-container>
</template>

<script>
import ProgressCard from 'components/ProgressCard.vue'
import { developStore } from 'stores/develop-store'
import { ref } from 'vue'
import { getCards } from 'src/api/progresss'
import { userStore } from 'stores/user-store'

export default {
  name: 'Info',
  components: { ProgressCard },
  setup () {
    const developstore = developStore()
    const cardlist = ref([])
    const userstore = userStore()
    return {
      developstore,
      cardlist,
      userstore
    }
  },
  data: function () {
    return {
      GroupModel: 'btn',
      tmp: {
        title: '',
        intro: ''
      },
      dialog: false,
      editdata: {}

    }
  },
  methods: {
    delcard (id) {
      this.developstore.delCard(id)
        .then(e => {
          this.getcards()
        })
    },
    opendialog (item) {
      if (this.userstore.getRole != 'SuperUser') return
      this.editdata = {
        title: item.title,
        intro: item.intro,
        status: item.status,
        progress: item.progress,
        creater: item.creater,
        developer: item.developer,
        id: item.id
      }
      console.log(this.editdata)
      this.dialog = true
    },
    addCard () {
      this.developstore.addcard(this.tmp)
        .then(e => {
          getCards()
        })
    },
    getcards () {
      this.developstore.getCards()
        .then(e => {
          this.cardlist = e
        })
    },
    changecard (data) {
      if (data.progress != 100) data.status = false
      this.developstore.updatecard(data)
        .then(e => {
          this.getcards()
        })
    },
    acptdata () {
      const data = {
        title: this.editdata.title,
        intro: this.editdata.intro,
        progress: 100,
        creater: this.editdata.creater,
        developer: this.editdata.developer,
        status: true,
        id: this.editdata.id
      }
      this.changecard(data)
    }
  },
  mounted () {
    this.getcards()
    this.developstore.changeheaderstatus('info')
  }
}
</script>

<style scoped>

</style>
