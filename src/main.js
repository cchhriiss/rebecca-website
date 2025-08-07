import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial } from 'three';

const nameEl = document.getElementById("rebecca");
const ringContainer = document.getElementById("ring-container");

let scene, camera, renderer, ring;
let hasFadedIn = false;

function init3D() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    ringContainer.clientWidth / ringContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(ringContainer.clientWidth, ringContainer.clientHeight);
  ringContainer.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 2.5);
  directional.position.set(3, 3, 5);
  scene.add(directional);

  const goldMaterial = new MeshStandardMaterial({
    color: 0xffd700,
    metalness: 1.0,
    roughness: 0.3
  });

  const loader = new OBJLoader();
  loader.load('/ring.obj', (obj) => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = goldMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    ring = obj;
    ring.scale.set(0.1, 0.1, 0.1);
    ring.position.set(0, 0, 0);
    scene.add(ring);
    animate();
  }, undefined, (err) => {
    console.error('Failed to load OBJ:', err);
  });
}

function animate() {
  requestAnimationFrame(animate);

  if (ring) {
    const scrollY = window.scrollY;
    ring.rotation.x = scrollY * 0.005;
  }

  renderer.render(scene, camera);
}

// === SCROLL TRIGGERED LOGIC ===
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

// Show or hide ring depending on scroll, regardless of hasFadedIn
if (scrollY > 150) {
  ringContainer.style.opacity = 1;

  if (!hasFadedIn) {
    init3D();
    hasFadedIn = true;
  }
} else {
  ringContainer.style.opacity = 0;
}
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    nameEl.style.opacity = 1;
  } else {
    nameEl.style.opacity = 0;
  }

  // keep the ring code here...
});

