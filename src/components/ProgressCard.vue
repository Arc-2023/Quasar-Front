<template>

<q-card class="mdi-border-radius flex q-pa-sm no-wrap items-center cursor-pointer"
        v-ripple
        style="transition: all .2s ease-in-out;border-radius: 10px;background-color: rgba(255,255,255,0.5);min-width: 300px;"
        @mouseenter="e=>onmouseenter(e)"
        @mouseleave="e=>onmouseleave(e)">

  <div v-if="this.$props.progress<100" class="absolute-right flex items-center text-h1 no-wrap text-bold q-pa-sm" style="font-family: 'TypoGraphica',sans-serif;
            -webkit-text-fill-color: rgba(30,30,30,0.1);
            text-shadow: 4px 5px 10px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            overflow: hidden;
            pointer-events: none;
            ">
    <q-icon name="mdi-code-json" size="6rem">
    </q-icon>
    Developing
  </div>
  <div v-if="this.$props.status===true && this.$props.progress===100" class="absolute-right flex items-center text-h1 no-wrap text-bold q-pa-sm" style="font-family: 'TypoGraphica',sans-serif;
            -webkit-text-fill-color: rgba(0,200,0,0.1);
            text-shadow: 4px 5px 10px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            overflow: hidden;
            pointer-events: none;
            ">
    <q-icon name="mdi-code-tags-check" size="6rem">
    </q-icon>
    Accepted
  </div>
  <div v-if="this.$props.status!==true && this.$props.progress==100" class="absolute-right flex items-center text-h1 no-wrap text-bold q-pa-sm" style="font-family: 'TypoGraphica',sans-serif;
            -webkit-text-fill-color: rgba(0,200,0,0.1);
            text-shadow: 4px 5px 10px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            overflow: hidden;
            pointer-events: none;
            ">
    <q-icon name="mdi-bug-check-outlin" size="6rem">
    </q-icon>
    Done
  </div>
  <q-card-section class="text-bold" v-ripple style="font-family: 'TypoGraphica',sans-serif;pointer-events: none;">
    <q-circular-progress
      :color="getcolorbyprogress(this.$props.progress)"
    :value="this.$props.progress"
    size="5rem"
    show-value
    class=" text-bold"
    :thickness="0.5"
    track-color="grey">
    </q-circular-progress>
  </q-card-section>
  <q-card-section class="column" v-ripple style="pointer-events: none;">
    <div class="row items-end no-wrap">
      <div class="text-h4 text-bold ellipsis">{{this.$props.title}}</div>

    </div>
    <div class="text-primary ellipsis-3-lines">{{this.$props.intro}}</div>
  </q-card-section>
  <q-chip class="absolute-top-right" v-ripple="false" dense>{{this.$props.creater}}</q-chip>
</q-card>
</template>

<script>

export default {
  name: 'ProgressCard',
  data () {
    return {
      GroupModel: 'info'
    }
  },
  props: {
    title: {
      type: String,
      default: 'title'
    },
    progress: {
      type: Number,
      default: 66
    },
    status: {
      type: Boolean,
      default: false
    },
    creater: {
      type: String,
      default: 'noone'
    },
    developer: {
      type: String,
      default: 'noone'
    },
    intro: {
      type: String,
      default: 'intro and intro intro and intro intro and intro intro and intro intro and intro intro and intro intro and intro intro and intro intro and intro intro and intro '
    }
  },
  methods: {
    onmouseenter (event) {
      event.target.style.borderRadius = '20px'
    },
    onmouseleave (event) {
      event.target.style.borderRadius = '10px'
    },
    getcolorbyprogress (pro) {
      if (pro == 100) return 'green'
      if (pro > 70) return 'blue-2'
      if (pro > 45) return 'yellow-5'
      else return 'red-4'
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/typographica');
</style>
