<template>
    <div class="container">

    </div>
</template>
<script setup lang="ts">

import { onMounted } from 'vue'
import { InitScene } from './utils/SceneUtils'
import * as  THREE from 'three';

onMounted(() => {
    const root = document.getElementsByClassName("container")[0] as HTMLDivElement;
    let xZhou = createOut(1000)
    InitScene(root, (scene, camera)=>{
        scene.add(xZhou);
    },
    (engine:THREE.WebGLRenderer)=>{

    }
    )
})

function createOut(r: number): THREE.Object3D<THREE.Event> {
  let center = new THREE.Vector3();
  let path: THREE.Vector3[] = []
  let div = 3;

  let indexes: number[] = [];
  for (let index = 0; index < 360 / div; index++) {
    let angle = index * div * Math.PI / 180;
    let offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r - 28));
    let offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r - 28));
    let p = center.clone().add(offsetX).add(offsetZ);

    angle = (index + 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r - 15));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r - 15));
    let p2 = center.clone().add(offsetX).add(offsetZ);

    angle = (index - 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r - 15));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r - 15));
    let p3 = center.clone().add(offsetX).add(offsetZ);


    angle = (index + 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r));
    let p4 = center.clone().add(offsetX).add(offsetZ);

    angle = (index - 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r));
    let p5 = center.clone().add(offsetX).add(offsetZ);

    let offset = new THREE.Vector3(0, 0, 20);

    let start = path.length;
    let curPs = [p, p2, p3, p4, p5];

    // let curPs = [p, p2, p3, p2, p3, p4, p4, p5, p3];
    path.push(...curPs);
    curPs.forEach(item => path.push(item.clone().add(offset)))

    AddIndex(indexes, start);
  }
  let geo = new THREE.BufferGeometry();
  geo.setFromPoints(path);
  geo.setIndex(indexes);
  geo.computeVertexNormals();
  let material = new THREE.MeshPhysicalMaterial({
    map: null,
    color: 0xffbc36,
    metalness: 1,
    roughness: 0.8,
    opacity: 1,
    premultipliedAlpha: true
  });
  material.side = THREE.DoubleSide;

//   const curve = new CustomSinCurve(10, 10, 6.5);
//   const geometry = new THREE.TubeGeometry(curve, 2000, 5, 8, false);
  let particleLight = new THREE.Mesh(geo, material);
//   particleLight.add(new THREE.Mesh(geometry, material))
  return particleLight;
}
function AddIndex(indexes: number[], start: number) {
  indexes.push(start, start + 1, start + 2);
  indexes.push(start + 3, start + 2, start + 1);
  indexes.push(start + 3, start + 4, start + 2);

  indexes.push(start + 7, start + 6, start + 5);
  indexes.push(start + 6, start + 7, start + 8);
  indexes.push(start + 7, start + 9, start + 8);

  indexes.push(start + 0, start + 5, start + 1);
  indexes.push(start + 1, start + 5, start + 6);

  indexes.push(start + 0, start + 2, start + 7);
  indexes.push(start + 0, start + 7, start + 5);

  indexes.push(start + 3, start + 4, start + 8);
  indexes.push(start + 8, start + 4, start + 9);

}
</script>
<style scoped>
.read-the-docs {
    color: #888;
}

.container {
    position: absolute !important;
<<<<<<< HEAD
=======
    top: -550px;
    left: 1200px;
>>>>>>> 4c3cd88694a25f9419a7553576b0bd8870b6f621
}
</style>