<template>
  <q-layout class="q-pa-sm">
    <q-card  flat class="mycard row q-pt-sm q-pl-sm q-pr-sm" v-ripple style="
    height: 200px;
    overflow: hidden;
    border-radius: 20px;
    transform-style: preserve-3d;
    transition: all .1s;
    perspective: 100px;
    background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%)">
      <div class="" style="max-width: 70%">
        <q-card-section class="items-baseline colume q-pb-none">
          <div class="text-h3 text-bold">
            Title
          </div>
          <q-separator color="orange"
                       style="width: 1px;
                       height: 10px;
                       overflow: hidden;
                       transition: all .3s ease-in-out;
                       border-radius: 10px"
                       class="sepr"
                          />
          <div class="text-subtitle2 q-ma-none q-pa-none">
            Create By {{testdata.creator}}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-item dense class="q-pa-none">
            <q-item-section class="q-pa-none">
              <q-item-label class="wrap" :lines="4" style="">
                使得否使得否使得否使得否否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否使得否
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </div>
        <q-card-section style="width: 30%;" class=" column items-end ">
          <div>
            <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">
              <q-icon name="event" size="5px" style="margin-right: 3px"></q-icon>
              dojfdsfdj
            </q-badge>
          </div>
          <div>
            <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">
              <q-icon name="event" size="5px" style="margin-right: 3px"></q-icon>
              dojfdsfdj
            </q-badge>
          </div>
        </q-card-section>

    </q-card>
  </q-layout>

</template>

<script>
export default {
  name: 'NoteCard',
  props: {
    title: String,
    creator: String,
    lastedittime: String,
    createdTime: String,
    view: Number
  },
  created () {
    return {

    }
  },
  data: function () {
    return {
      testdata: {
        title: 'title',
        creator: 'creator',
        lastedittime: 'kast',
        createdTime: 'crtime',
        view: 22
      },
      hover_dom: ''
    }
  },
  mounted () {
    const multiple = 25
    const mouseover = document.getElementsByClassName('mycard')[0]
    const element = document.getElementsByClassName('mycard')[0]
    console.log(mouseover)
    console.log(element)
    function transformElement (x, y) {
      const box = element.getBoundingClientRect()
      const calcX = (y - box.y - (box.height / 2)) / multiple
      const calcY = (x - box.x - (box.width / 2)) / multiple

      element.style.transform = 'rotateX(' + calcX + 'deg) ' +
        'rotateY(' + calcY + 'deg)'
    }
    mouseover.addEventListener('mousemove', (e) => {
      window.requestAnimationFrame(function () {
        transformElement(e.clientX, e.clientY)
      })
    })
    mouseover.addEventListener('mouseleave', e => {
      window.requestAnimationFrame(function () {
        element.style.transform = 'rotateX(0) rotateY(0)'
        mouseover.getElementsByClassName('sepr')[0].style.width = '1px'
      })
    })
    mouseover.addEventListener('mouseenter', e => {
      mouseover.getElementsByClassName('sepr')[0].style.width = '100px'
    })
  },
  computed () {

  },
  watch () {

  }
}
</script>

<style scoped>
</style>
