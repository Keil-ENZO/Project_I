import * as THREE from 'three';


import texture from "../style/img/texture.jpeg";
import materiel from "../style/img/materiel.png";
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
camera.position.z = 5;

// Créer le rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

// Créer un cube
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({
  color: 0x808080,
  map: textureLoader.load(texture),
  wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


// le cubre suit la souris
window.addEventListener("mousemove", (event) => {
  cube.rotation.x = (event.clientY / window.innerHeight) * 2;
  cube.rotation.y = (event.clientX / window.innerWidth) * 2;
});

// Créer une boucle de rendu
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();


