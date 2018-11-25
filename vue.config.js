module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vue-speech/'
    : '/',
  css: {
    extract: false
  }
}
