import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
function InitScene(
  root: HTMLDivElement,
  loadScene: (scene: THREE.Scene, camera: THREE.OrthographicCamera) => void,
  animationLoop: (engine: THREE.WebGLRenderer) => void
) {
  const canvas = document.createElement("canvas");
  canvas.style.width = "454px";
  canvas.style.height = "454px";
  root?.appendChild(canvas);
  const camera = new THREE.OrthographicCamera(
    -1000,
    1000,
    1000,
    -1000,
    -5000,
    5000
  );
  camera.rotateZ(0.05);
  camera.position.set(0, 0, 454);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let control = new OrbitControls(camera, canvas);
  const scene = new THREE.Scene();
  scene.add(CreateLightLayer());
  loadScene(scene, camera);
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
  engine.setAnimationLoop(() => {
    animationLoop(engine);
    engine.render(scene, camera);
  });
}
function CreateLightLayer(): THREE.Object3D {
  let lightLayer = new THREE.Group();
  lightLayer.name = "lightLayer";
  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 500);
  lightLayer.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff);
  dirLight2.position.set(-1, -1, -500);
  lightLayer.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xff0000);
  lightLayer.add(ambientLight);
  return lightLayer;
}

export {InitScene}
