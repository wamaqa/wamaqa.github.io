import { defineConfig } from 'vitepress';
<<<<<<< HEAD
import markdownItMermaid from 'markdown-it-mermaid'
import mdIt from 'markdown-it-footnote'
=======
import mdFootnote from 'markdown-it-footnote'
>>>>>>> 4c3cd88694a25f9419a7553576b0bd8870b6f621

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
  },
  outDir:"../docs",
  markdown:{
    config:md=>{
<<<<<<< HEAD
      md.use(mdIt)
      // md.use(markdownItMermaid);
    },
  },
  mermaid:{

  }
});

// import { defineConfig } from "vitepress";
// import { withMermaid } from "vitepress-plugin-mermaid";

// export default withMermaid(
//   defineConfig({
//     // your existing vitepress config...
//     // optionally, you can pass MermaidConfig
//     mermaid: {
//       // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
//     },
//   })
// );
=======
      md.use(mdFootnote)
    }
  }
});
>>>>>>> 4c3cd88694a25f9419a7553576b0bd8870b6f621
