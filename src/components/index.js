import VueSpeechRecognition from './VueSpeechRecognition'
import VueSpeechSynthesis from './VueSpeechSynthesis'

export default function install (Vue, options = {}) {

  if (!options.components || options.components === 'all') {
    Vue.component('vue-speech-recognition', VueSpeechRecognition)
    Vue.component('vue-speech-synthesis', VueSpeechSynthesis)
  }

}
