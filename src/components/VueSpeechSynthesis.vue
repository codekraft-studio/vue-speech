<template>
<div class="vue-speech-synthesis" @click="start">

  <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://web.resource.org/cc/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.0" :width="width" :height="height" viewBox="0 0 75 75">
    <g>
      <polygon points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769" :style="iconStyle" />
      <g v-if="!isSpeaking">
        <path :style="pathStyle" d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577" />
        <path :style="pathStyle" d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076" />
        <path :style="pathStyle" d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01" />
      </g>

      <g v-else>
        <path d="M 48.651772,50.269646 69.395223,25.971024" :style="pathStyle" />
        <path d="M 69.395223,50.269646 48.651772,25.971024" :style="pathStyle" />
      </g>
    </g>
  </svg>
</div>
</template>

<script>
const svgStyle = {
  'stroke-width': 5,
  'stroke-linejoin': 'round',
  'stroke-linecap': 'round'
}
export default {
  name: 'VueSpeechSynthesis',
  props: {
    text: {
      type: [String, Array],
      required: true
    },
    readOnLoad: {
      type: Boolean,
      default: false
    },
    readOnChange: {
      type: Boolean,
      default: false
    },
    lang: String,
    pitch: {
      type: Number,
      default: 1
    },
    volume: {
      type: Number,
      default: 1
    },
    rate: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#ccc'
    },
    width: {
      type: Number,
      default: 32
    },
    height: {
      type: Number,
      default: 32
    }
  },
  data () {
    return {
      isSpeaking: false
    }
  },
  computed: {
    utteranceText() {
      return Array.isArray(this.text) ? this.text.join(' ') : this.text
    },
    iconStyle () {
      return Object.assign({
        'fill': this.color,
        'stroke': this.color,
      }, svgStyle)
    },
    pathStyle () {
      return Object.assign({
        'fill': 'none',
        'stroke': this.color,
      }, svgStyle)
    }
  },
  methods: {
    start() {
      if (this.$_synth.speaking) {
        this.$_synth.cancel()
        this.isSpeaking = false
        this.$emit('stop')
        return
      }

      if (this.utteranceText === '') {
        return
      }

      const utterance = new SpeechSynthesisUtterance(this.utteranceText)
      utterance.volume = this.volume
      utterance.rate = this.rate
      utterance.pitch = this.pitch
      utterance.lang = this.lang

      utterance.addEventListener('end', (e) => {
        if (this.$_synth.pending || this.$_synth.speaking) {
          return
        }

        this.isSpeaking = false
        this.$emit('end', e)
      })

      this.$_synth.speak(utterance)
      this.isSpeaking = true
    }
  },
  watch: {
    text() {
      if (this.readOnChange) {
        this.start()
      }
    }
  },
  created() {
    const SpeechSynthesis = window.speechSynthesis
    if (!SpeechSynthesis && process.env.NODE_ENV !== 'production') {
      throw new Error('Speech Synthesis is not supported in current browser.')
    }
    this.$_synth = SpeechSynthesis
  },
  mounted() {
    if (this.readOnLoad) {
      this.start()
    }
  }
}
</script>

<style lang="scss">
.vue-speech-synthesis {
  cursor: pointer;
}
</style>
