import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  SphereGeometry,
  MeshToonMaterial,
  Mesh,
  MathUtils,
} from "three";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const light = new DirectionalLight("#fff", 1);
light.castShadow = true;
scene.add(light);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let objects = [];

for (let i = 0; i < 5; i++) {
  const geometry = new SphereGeometry(1);
  const material = new MeshToonMaterial({ color: "yellow" });
  const sphere = new Mesh(geometry, material);

  const rand = MathUtils.randFloat(-2, 2);
  sphere.position.y = rand;
  sphere.position.x = rand;

  objects.push(sphere);
  scene.add(sphere);
}

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // objects.map((item) => (item.position.y -= 0.005));

  // objects.map((item) => i);

  renderer.render(scene, camera);
}

animate();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
