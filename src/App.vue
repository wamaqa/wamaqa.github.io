<script setup lang="ts">
import { onMounted } from 'vue'
import markdownIt from 'markdown-it'
import markdownItMermaid from 'markdown-it-plugin-mermaid'


onMounted(()=>{
  let div =true;
  if(div)
  {
    const mdi = markdownIt()
    let renderer = mdi.use(markdownItMermaid)
    let str =renderer.render(`
\`\`\`mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
		C-->D;
\`\`\`
`);
    document.getElementById("sd").innerHTML = str
  }
})



</script>
<template>
  <div id = "sd"></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
