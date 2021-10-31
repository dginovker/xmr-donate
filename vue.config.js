module.exports = {
  pages: {
    index: {
      entry: './src/pages/Home/main.js',
      template: 'public/index.html',
      title: 'xmr-donate',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    terms: {
      entry: './src/pages/Terms/terms.js',
      template: 'public/index.html',
      title: 'xmr-donate | Terms',
      chunks: ['chunk-vendors', 'chunk-common', 'terms']
    },
  }
}