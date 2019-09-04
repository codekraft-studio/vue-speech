<template>
  <div class="vue-speech-recognition" :class="{
    'active': isRecognizing
  }" @click="start">
    <span></span>
  </div>
</template>

<script>
// TODO: Add support for custom recognition grammar
// @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammar

const redirectedEvents = [
  'audio-start',
  'audio-end',
  'sound-start',
  'sound-end',
  'speech-start',
  'speech-end'
]

export default {
  name: 'VueSpeechRecognition',
  props: {
    lang: {
      type: String,
      default: 'en-US'
    },
    continuous: {
      type: Boolean,
      default: false
    },
    interimResults: {
      type: Boolean,
      default: true
    },
    maxAlternatives: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    isRecognizing: false,
    runtimeTranscription: '',
    transcription: []
  }),
  methods: {
    start () {
      if (this.isRecognizing) {
        this.$_recognition.abort()
        return
      }
      this.$_recognition.start()
    }
  },
  created () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition && process.env.NODE_ENV !== 'production') {
      throw new Error('Speech Recognition is not supported in current browser.')
    }

    this.$_recognition = new SpeechRecognition()
    this.$_recognition.lang = this.lang
    this.$_recognition.continuous = this.continuous
    this.$_recognition.maxAlternatives = this.maxAlternatives
    this.$_recognition.interimResults = this.interimResults

    this.$_recognition.addEventListener('start', () => {
      this.isRecognizing = true
      this.$emit('start')
    })

    this.$_recognition.addEventListener('error', () => {
      this.isRecognizing = false
      this.$emit('end')
    })

    // Store the runtime captured transciption text
    this.$_recognition.addEventListener('result', event => {
      const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      this.runtimeTranscription = text
    })

    // On recognition end if a good transciption has been captured
    // emit the transcription event with the whole transciptions list
    // and the last captured sentence than reset the runtime transciption
    this.$_recognition.addEventListener('end', () => {
      this.isRecognizing = false

      if (this.runtimeTranscription !== '') {
        this.transcription.push(this.runtimeTranscription)

        this.$emit('transcription', {
          transcription: this.transcription,
          lastSentence: this.runtimeTranscription
        })
      }

      this.runtimeTranscription = ''
      this.$emit('end')
    })

    // Redirect standard events as Vue component events
    redirectedEvents.forEach(eName => {
      const originalEvent = eName.replace('-', '')
      this.$_recognition.addEventListener(originalEvent, () => {
        this.$emit(eName)
      })
    })
  }
}
</script>

<style lang="scss">
  .vue-speech-recognition {
    cursor: pointer;
    position: relative;
    background-color: #4DB6AC;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: block;

    &:hover {
      background-color: #26A69A;
    }

    &.active {
      background-color: #ef5350;
      -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    }

    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: #fff;
    }

    &:after {
      top: 30%;
      left: 43%;
      height: 15%;
      width: 14%;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }

    &:before {
      top: 40%;
      left: 43%;
      height: 15%;
      width: 14%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
    }

    span {
      position: absolute;
      top: 50%;
      left: 36%;
      height: 24%;
      width: 28%;
      overflow: hidden;

      &:before,
      &:after {
        content: '';
        position: absolute;
        background-color: #fff;
      }

      &:before {
        bottom: 50%;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 0.125em solid #fff;
        background: none;
        right: 0px;
      }

      &:after {
        top: 50%;
        left: 40%;
        width: 20%;
        height: 25%;
      }
    }
  }

  @keyframes pulse {
    from {
      box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
    }

    to {
      box-shadow: 0 0 0 10px rgba(239, 83, 80, 0.1);
      background-color: #E53935;
      transform: scale(0.9);
    }
  }
</style>
