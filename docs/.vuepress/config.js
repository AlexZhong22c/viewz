const path = require('path')

module.exports = {
  title: 'VIEWZ UI',
  base: '/viewz/',
  description: '一个好用的UI库',
  themeConfig: {
    nav: [
      {text: '主页', link: '/'},
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
    includePaths: [path.join(__dirname, '../../style')]
  }
}