module.exports = {
  title: 'My Vuepress Blog',
  description: 'A blog that powered by Vue',
  dest: './dist',
  plugins: ['clean-urls'],
  themeConfig: {
    logo: '/img/logo.png',
    search: false,
    nav: [{ text: 'About', link: '/about/' }]
  }
}
