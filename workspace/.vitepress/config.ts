import { defineConfig } from 'vitepress';
import markdownItMermaid from 'markdown-it-plugin-mermaid'
import mdFootnote from 'markdown-it-footnote'

export default defineConfig({
  title:"wamaqa",
  themeConfig: {
    nav: [
      { text: '主页', link: '/', activeMatch: '/guide/what-is-vitepress' },
      {
        text: '下拉选择框',
        items: [
          { text: '软考', link: '/ruankao/' },
          { text: 'options-2', link: '/' }
        ]
      }
    ],
    sidebar:[
      {
        text: '类目',
        items: [
          { text: '软考', link: '/ruankao/' },
          // { text: 'dpp', link: '/' },
        ],
        // collapsible: true,
        collapsed: true
      }
    ]
  },
  outDir:"../docs",
  markdown:{
    config:md=>{
      md.use(mdFootnote)
      md.use(markdownItMermaid);
    },
  },
  mermaid:{
  }
});
