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
        <vue-speech-recognition lang="it" @start="onStart" @end="onEnd" @transcription="onTranscription" />

        <div class="results-box">
          {{capturedText.join(' ')}}
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
      capturedText: []
    }
  },
  methods: {
    onStart () {
      console.log('Voice recognition started.');
    },
    onEnd (data) {
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

<style>
  .navbar {
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #fafafa;
  }

  .navbar-brand img {
      width: 64px;
      max-height: 100%;
  }

  .results-box {
    background-color: #f9f3f5;
    padding: 20px;
    min-height: 150px;
    border: thin solid #F8BBD0;
  }

  footer {
    margin-top: 50px;
  }
</style>
