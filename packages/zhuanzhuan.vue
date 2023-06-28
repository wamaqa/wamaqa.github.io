//@ingore-ts

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

onMounted(() => {
  const root = document.getElementById("container");
  if (root) {
    root.style.left = `${window.innerWidth - 600} px`;
    root.style.top = `${window.innerHeight - 600} px`;
  }
  const canvas = document.createElement("canvas");
  canvas.style.width = "454px";
  canvas.style.height = "454px";

  root?.appendChild(canvas);
  const camera = new THREE.OrthographicCamera(-454, 454, 454, -454, -4540, 4540);
  camera.rotateZ(0.05)
  camera.position.set(0, 0, 454);
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  //@ts-ignore
  let control = new OrbitControls(camera, canvas)

  const scene = new THREE.Scene();
  let r1 = 454, r2 = 100;
  let out = createOut(r1);
  let lun = createLun(r1, r2);
  let gun = createGun(r2);
  let lunS = createGunS(r2)
  scene.add(gun)
  scene.add(out)
  scene.add(lunS)
  scene.add(lun)
  scene.add(CreateLightLayer());
  const engine = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    precision: "highp",
    alpha: true,
  });
  engine.setClearColor(0xffffff, 0.0);
  engine.setPixelRatio(window.devicePixelRatio);
  engine.setSize(454, 454);
  engine.shadowMap.enabled = true;
  engine.toneMapping = THREE.ACESFilmicToneMapping;
  engine.toneMappingExposure = 1.25;

  engine.outputEncoding = THREE.sRGBEncoding;
  let center = gun.position.clone();
  let start = center.clone().add(new THREE.Vector3(0, -200, 0))
  let end = center.clone().add(new THREE.Vector3(0, 200, 0))
  let gs = new THREE.SphereGeometry(10);
  let m = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let test = new THREE.InstancedMesh(gs, m, 3);
  test.setMatrixAt(0, new THREE.Matrix4().setPosition(start))
  test.setMatrixAt(1, new THREE.Matrix4().setPosition(center))
  test.setMatrixAt(2, new THREE.Matrix4().setPosition(end))
  // d.position.copy(loc);
  scene.add(test)
  let time = 0;
  let roCenter = lun.position.clone();
  let rotation = new THREE.Matrix4();
  let gunLoc = gun.position.clone();
  engine.setAnimationLoop(() => {
    time++;
    let v1 = time * 0.11 * Math.PI / 180;
    lun.rotateZ(v1 * (450 - 28) / (80 + 15));
    out.rotateZ(v1);
    rotation.multiply(new THREE.Matrix4().makeRotationZ(v1 * (450 - 28) / (80 + 15)));

    let newStart = start.clone().sub(roCenter).applyMatrix4(rotation).add(roCenter);

    let x = newStart.clone().sub(start).x;
    let r = Math.asin(x / 400);
    let y = Math.sqrt(160000 - x * x)
    let newEnd = end.clone().add(new THREE.Vector3(0, newStart.y + y, 0))
    newEnd.y = newStart.y + y;
    test.setMatrixAt(0, new THREE.Matrix4().setPosition(newStart))
    test.setMatrixAt(2, new THREE.Matrix4().setPosition(newEnd))
    test.setMatrixAt(1, new THREE.Matrix4().setPosition(newEnd.clone().add(newStart).multiplyScalar(0.5)))
    test.instanceMatrix.needsUpdate = true;
    // let r = Math.asin((loc.x - newLoc.x) / 400);
    gun.rotation.set(0, 0, 0)
    gun.rotateZ(r)
    // // gun.updateMatrix();
    let offset = newEnd.clone().add(newStart).multiplyScalar(0.5).sub(gunLoc)
    gun.position.copy(gunLoc.clone().add(offset))
    // d.position.copy(newLoc);
    engine.render(scene, camera);
  })

})

function CreateLightLayer(): THREE.Object3D {
  let lightLayer = new THREE.Group();
  lightLayer.name = "lightLayer";
  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 500);
  lightLayer.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff);
  dirLight2.position.set(- 1, - 1, - 500);
  lightLayer.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xff0000);
  lightLayer.add(ambientLight);
  return lightLayer;
}

class CustomSinCurve extends THREE.Curve<THREE.Vector3> {
  a: number;
  b: number;
  c: number;

  constructor(a: number, b: number, c: number) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;

  }

  getPoint(t: number) {
    t = -2 * Math.PI * t * this.c;
    let r = this.a + this.b * t;

    let x = r * Math.cos(t);
    let y = r * Math.sin(t);

    return new THREE.Vector3(x, y, 0);
  }
  //@ts-ignore
  scale(scale: any) {
    throw new Error('Method not implemented.');
  }
}
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

  const curve = new CustomSinCurve(10, 10, 6.5);
  const geometry = new THREE.TubeGeometry(curve, 2000, 5, 8, false);
  let particleLight = new THREE.Mesh(geo, material);
  particleLight.add(new THREE.Mesh(geometry, material))
  return particleLight;
}


function createGunS(r: number) {
  let geo = new THREE.CylinderGeometry(10, 10, 200);
  let material = new THREE.MeshPhysicalMaterial({
    map: null,
    color: 0xffbc36,
    metalness: 1,
    roughness: 0.8,
    opacity: 1,
    side: THREE.DoubleSide,
    premultipliedAlpha: true
  });
  material.side = THREE.DoubleSide
  let particleLight = new THREE.Mesh(geo, material);
  particleLight.position.x = r - 10
  particleLight.position.y = 90;
  particleLight.rotateZ(0.5 * Math.PI / 180)
  return particleLight;
}
function createGun(r: number) {
  let geo = new THREE.CylinderGeometry(5, 5, 400);
  let material = new THREE.MeshPhysicalMaterial({
    map: null,
    color: 0xffbc36,
    metalness: 1,
    roughness: 0.8,
    opacity: 1,
    side: THREE.DoubleSide,
    envMapIntensity: 10,
    premultipliedAlpha: true
  });
  material.side = THREE.DoubleSide
  let particleLight = new THREE.Mesh(geo, material);
  particleLight.position.x = r - 20
  particleLight.position.y = -200 + r - 20;
  particleLight.rotateZ(0.5 * Math.PI / 180)
  return particleLight;
}

function createLun(r0: number, r: number): THREE.Object3D<THREE.Event> {
  let center = new THREE.Vector3(0, 0, 0);
  let path: THREE.Vector3[] = []
  let div = 12;

  let indexes: number[] = [];
  for (let index = 0; index < 360 / div; index++) {
    let angle = (index) * div * Math.PI / 180;
    let offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r + 28));
    let offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r + 28));
    let p = center.clone().add(offsetX).add(offsetZ);

    angle = (index + 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r + 15));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r + 15));
    let p2 = center.clone().add(offsetX).add(offsetZ);

    angle = (index - 0.5) * div * Math.PI / 180;
    offsetX = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.cos(angle) * (r + 15));
    offsetZ = new THREE.Vector3(0, 1, 0).multiplyScalar(Math.sin(angle) * (r + 15));
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

    AddIndex1(indexes, start);
  }
  let geo = new THREE.BufferGeometry();
  geo.setFromPoints(path);
  geo.setIndex(indexes);
  geo.computeVertexNormals();
  geo.computeTangents();
  let material = new THREE.MeshPhysicalMaterial({
    map: null,
    color: 0xffffff,
    metalness: 1,
    roughness: 1,
    side: THREE.FrontSide,
    opacity: 1,
    premultipliedAlpha: true
  });
  let particleLight = new THREE.Mesh(geo, material);
  particleLight.position.y = -(r0 - r - 45)
  particleLight.rotateZ(0.5 * Math.PI / 180)

  const curve = new CustomSinCurve(4, 4, 3.5);
  const geometry = new THREE.TubeGeometry(curve, 2000, 5, 8, false);
  particleLight.add(new THREE.Mesh(geometry, material))

  return particleLight;

}

function AddIndex1(indexes: number[], start: number) {
  let cur: number[] = [];
  cur.push(start, start + 1, start + 2);
  cur.push(start + 3, start + 2, start + 1);
  cur.push(start + 3, start + 4, start + 2);

  cur.push(start + 7, start + 6, start + 5);
  cur.push(start + 6, start + 7, start + 8);
  cur.push(start + 7, start + 9, start + 8);

  cur.push(start + 0, start + 5, start + 1);
  cur.push(start + 1, start + 5, start + 6);

  cur.push(start + 0, start + 2, start + 7);
  cur.push(start + 0, start + 7, start + 5);

  cur.push(start + 3, start + 4, start + 8);
  cur.push(start + 8, start + 4, start + 9);

  indexes.push(...cur.reverse())

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

<template>
  <div id="container">

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

div#container {
  position: absolute !important;
  top: -550px;
  left: 1200px;
}
</style>
