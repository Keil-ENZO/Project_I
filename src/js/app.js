import * as THREE from 'three';


// Récupérer le conteneur du canvas
const canvasContainer = document.getElementById("canvas-container");

// Créer la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Créer la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Créer le rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
canvasContainer.appendChild(renderer.domElement);

//Texture du cube
const loader = new THREE.TextureLoader();
const texture = loader.load("../style/img/materiel.png", () => {
  animate();
});

// Créer un cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });
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


