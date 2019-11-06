import VueSpeechRecognition from './VueSpeechRecognition'
import VueSpeechSynthesis from './VueSpeechSynthesis'

export {
  VueSpeechRecognition,
  VueSpeechSynthesis
}

export default function install (Vue) {
  Vue.component('VueSpeechRecognition', VueSpeechRecognition)
  Vue.component('VueSpeechSynthesis', VueSpeechSynthesis)
}
