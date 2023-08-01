import * as THREE from "three";

import texture from "../style/img/texture.jpeg";
import svg from "../style/img/background.svg";

// Récupérer le conteneur du canvas
const canvasContainer = document.getElementById("canvas-container");
const textureLoader = new THREE.TextureLoader();

// Créer la scène
const scene = new THREE.Scene();
const bgScene = textureLoader.load(svg);
scene.background = bgScene;

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

// Créer un sphere
const radius = 0.9;
const segments = 32;
const rings = 16;
const sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);

const material = new THREE.MeshStandardMaterial({
  map: textureLoader.load(texture),
  metalness: 0.9, // Réglez la metalness pour un effet métallisé
  roughness: 0.1, // Réglez la roughness pour ajuster l'apparence du matériau
});

const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// Ajouter une lumière pour éclairer la scène
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Fonction pour exécuter la transition de l'échelle de la sphère
function runSphereScaleTransition(targetPosition, duration) {
  // Sauvegarder l'échelle actuelle de la sphère comme échelle de départ
  const startPositionX = sphere.position.clone();

  // Variable pour la gestion du temps
  let startTime = null;

  // Fonction de mise à jour de l'échelle de la sphère pour la transition
  function updateSphereScale(timestamp) {
    if (startTime === null) {
      startTime = timestamp;
    }

    // Calculer le temps écoulé depuis le début de la transition
    const elapsedTime = timestamp - startTime;

    // Calculer le pourcentage d'avancement de la transition
    const progress = Math.min(elapsedTime / duration, 1);

    // Calculer l'échelle actuelle en fonction du pourcentage d'avancement
    const currentScale = startPositionX.clone().lerp(targetPosition, progress);

    // Appliquer l'échelle à la sphère
    sphere.position.copy(currentScale);

    // Continuer la transition jusqu'à ce qu'elle soit terminée
    if (progress < 1) {
      requestAnimationFrame(updateSphereScale);
    }
  }

  // Démarrer la transition
  requestAnimationFrame(updateSphereScale);
}

// La fonction pour déformer la sphère en fonction de la position de la souris
function deformSphere(event) {
  // Rotation de la sphère en fonction de la position de la souris
  sphere.rotation.x = (event.clientY / window.innerHeight) * 0.5;
  sphere.rotation.y = (event.clientX / window.innerWidth) * -2;

  // Étirer la sphère en fonction de la position de la souris
  const maxStretch = 0.3; // Amplitude maximale de l'étirement
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;
  const stretchX = 1 + (deltaX / centerX) * maxStretch;
  const stretchY = 1 + (deltaY / centerY) * maxStretch;
  sphere.scale.set(stretchX, stretchY, 1);
}

let play = false;

// La sphere suit la souris
window.addEventListener("mousemove", (event) => {
  const duration = 800; // Durée de la transition en millisecondes

  // Si la transition n'est pas déjà en cours, la démarrer
  if (!play) {
    play = true;
    runSphereScaleTransition(new THREE.Vector3(0, 0, 2), duration);
  }

  if (play) {
    deformSphere(event);
  }
});

// Créer une boucle de rendu
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
