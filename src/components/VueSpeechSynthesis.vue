<template>
  <div class="vue-speech-synthesis" @click="start">
    <span>TALK</span>
  </div>
</template>

<script>
const redirectedMethods = [
  'cancel',
  'pause',
  'resume'
]

export default {
  name: 'VueSpeechSynthesis',
  props: {
    text: [String, Array]
  },
  methods: {
    start () {},
    pause () {},
    resume () {},
    cancel () {}
  },
  created () {
    const SpeechSynthesis = window.speechSynthesis
    if (!SpeechSynthesis && process.env.NODE_ENV !== 'production') {
      throw new Error('Speech Synthesis is not supported in current browser.')
    }

    this.$_synth = SpeechSynthesis
  }
}
</script>
