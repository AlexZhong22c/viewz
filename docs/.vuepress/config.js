const path = require('path')

module.exports = {
  head: [ ['style', {}, `
/*  “隐藏路由”  */
.nav-links .nav-item:last-child { display:none;} 
`]],
  title: 'VIEWZ UI',
  base: '/viewz/',
  description: '一个好用的UI库',
  themeConfig: {
    nav: [
      {text: '主页', link: '/'},
      {text: '主页2', link: '/xx'},
      {text: '主页3', link: '/rr'},
      { text: '隐藏路由', link: '/hide/' },
      // {text: '文档', link: '/guide/'},
      // {text: '交流', link: 'https://google.com'},
    ],
    sidebar: [
      {
        title: '入门',
        children: [
          '/install/',
          '/get-started/',
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/button',
          '/components/grid',
          '/components/input',
          '/components/layout',
          '/components/popover',
          '/components/tabs',
          '/components/toast'
        ]
      },
    ]
  },
  scss: {
    sassOptions: {
      includePaths: [path.join(__dirname, '../../style')]
    }
  }
}