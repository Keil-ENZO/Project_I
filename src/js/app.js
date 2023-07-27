import * as THREE from 'three';


import texture from "../style/img/texture.jpeg";
// Récupérer le conteneur du canvas
const canvasContainer = document.getElementById("canvas-container");

// Créer la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Créer la caméra
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

// Créer le rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

// Créer un sphere
const radius = 1;
const segments = 32;
const rings = 16;
const sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);

const material = new THREE.MeshBasicMaterial({
  color: 0x808080,
  map: textureLoader.load(texture),
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// le cubre suit la souris
window.addEventListener("mousemove", (event) => {
  sphere.rotation.x = (event.clientY / window.innerHeight) * 0.5;
  sphere.rotation.y = (event.clientX / window.innerWidth) * -2;

  const modification = new THREE.SphereGeometry(2, 32, 32);
  sphere.geometry = modification;
});

// Créer une boucle de rendu
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();


