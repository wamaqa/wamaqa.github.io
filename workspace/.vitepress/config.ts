import { defineConfig } from 'vitepress';
import mdFootnote from 'markdown-it-footnote'
import { withMermaid } from "vitepress-plugin-mermaid";
import ruankao from './contents/ruankao'
export default withMermaid({
  title: "wamaqa",
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '主页', link: '/', activeMatch: '/guide/what-is-vitepress' },
      {
        text: '下拉选择框',
        items: [
          { text: '软考', link: '/ruankao/' },
        ]
      }
    ],
    sidebar: [
      {
        text: '类目',
        items: [
          ruankao
        ],
        // collapsible: true,
        collapsed: true
      }
    ]
  },
  outDir: "../docs",
  markdown: {
    config: md => {
      md.use(mdFootnote)
      // md.use(markdownItMermaid);
    },
  }
});
