<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://github.com/codekraft-studio/vue-speech">
          <img alt="Vue Speech" src="./assets/logo.png">
        </a>
      </div>

      <div class="navbar-logo">
        <h1 class="title">Vue Speech</h1>
        <h2 class="subtitle">
          integration and components for <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank">Web Speech API</a>
        </h2>
      </div>
    </nav>

    <main>
      <div class="container">
        <div class="buttons-container">
          <vue-speech-recognition
            :lang="inputLang"
            @start="onStart"
            @end="onEnd"
            @transcription="onTranscription"
          />
          <vue-speech-synthesis color="#26A69A" :width="64" :height="64" lang="en" text="vue speech is awesome" @stop="onAwesomeSpeakStop" @end="onAwesomeSpeakEnd" />
        </div>

        <div class="results-box">
          <span>{{capturedText.join(' ')}}</span>
          <vue-speech-synthesis color="#F8BBD0" :text="capturedText" />
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          Made with &hearts; by <a href="https://github.com/codekraft-studio">Codekraft Studio</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      inputLang: 'it',
      inputText: 'ciao pippuzzo',
      capturedText: [],
      awesomeCount: 0
    }
  },
  methods: {
    onAwesomeSpeakStop () {
      console.log('Vue Speech stopped.');
    },
    onAwesomeSpeakEnd () {
      console.log('Vue Speech is awesome!')
      this.awesomeCount = this.awesomeCount + 1
    },
    onStart () {
      console.log('Voice recognition started.');
    },
    onEnd () {
      console.log('Voice recognition ended.');
    },
    onTranscription ({lastSentence}) {
      console.log('Voice recognition transcription result:', lastSentence);
      this.capturedText.push(lastSentence)
    },
    onError (err) {
      console.log('Voice recognition error:', err);
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    height: 100%;
  }
}
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: #fafafa;
    margin-bottom: 40px;
  }

  .navbar-brand img {
      width: 64px;
      max-height: 100%;
  }

  .buttons-container {
    display: flex;
    max-width: 400px;
    text-align: center;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .results-box {
    position: relative;
    background-color: #f9f3f5;
    padding: 20px;
    min-height: 150px;
    max-width: 800px;
    margin: 0 auto;
    border: thin solid #F8BBD0;

    .vue-speech-synthesis {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
</style>
