import { defineConfig } from 'vitepress';


export default defineConfig({
  title:"wamaqa",
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/cpp/grpc', activeMatch: '/guide/what-is-vitepress' },
      {
        text: '下拉选择框',
        items: [
          { text: 'options-1', link: '/' },
          { text: 'options-2', link: '/' }
        ]
      }
    ],
    sidebar:[
      {
        text: 'Guide',
        items: [
          { text: 'cpp', link: '/' },
          { text: 'dpp', link: '/' },
        ],
        collapsible: true,
        collapsed: true
      }
    ]
  }
});