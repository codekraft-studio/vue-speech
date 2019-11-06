# Getting started

This vue plugin is an integration for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), be sure to check the browser compatibility to know if it fits for your project. The plugin it's still in early stage and any real-word usage feedback or features suggestion is well accepted.

## Installation

Install this project with your favourite package manager.

```
npm install @codekraft-studio/vue-speech
```

### Global registration

Import the plugin in your project and load it in your Vue application, this way you will have all of the components exposed by the plugin globally registered and availables on your templates.

```js
import Vue from 'vue'
import VueSpeech from '@codekraft-studio/vue-speech'

Vue.use(VueSpeech)
```

### Local registration

You can also load the components individually since they not depends by each other and can be locally registered.

```js
import { VueSpeechRecognition, VueSpeechSynthesis } from '@codekraft-studio/vue-speech'

export default {
  name: "MyComponent",
  components: { 
    VueSpeechRecognition, 
    VueSpeechSynthesis 
  }
}
```

## Components

The module expose two main components, one for the Speech Recognition, another one for the Speech Synthesis.

### SpeechRecognition

The speech reconition component can be used to recognize the user voice and turn it into text, with various of customization options.

```html
<VueSpeechRecognition
  lang="String"
  continuous="Boolean"
  interim-results="Boolean"
  max-alternatives="Number"
/>
```

---

### SpeechSynthesis

The speech synthesis component can be used to speak through the device synthesis voices, start and pause speech. It can be customized using the component properties as show below.

```html
<VueSpeechSynthesis
  text="Imma speak thru your pc"
  lang="String"
  pitch="Number"
  volume="Number"
  rate="Number"
  read-on-load="Boolean"
  read-on-change="Boolean"
  @start="Function"
  @stop="Function"
  @end="Function"
/>
```

::: warning
The __text__ property is required for the component to work.
:::

By default the component will not read the given text __on-load__ and __on-change__ but you can customize it using props, all other values has the default value as defined in the [SpeechSynthesis documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).


