import * as THREE from "three";

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
function runSphereScaleTransition(targetScale, duration) {
  // Sauvegarder l'échelle actuelle de la sphère comme échelle de départ
  const startScale = sphere.scale.clone();

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
    const currentScale = startScale.clone().lerp(targetScale, progress);

    // Appliquer l'échelle à la sphère
    sphere.scale.copy(currentScale);

    // Continuer la transition jusqu'à ce qu'elle soit terminée
    if (progress < 1) {
      requestAnimationFrame(updateSphereScale);
    }
  }

  // Démarrer la transition
  requestAnimationFrame(updateSphereScale);
}
  
  // La sphere suit la souris
  window.addEventListener("mousemove", (event) => {
    const scale = 2; // L'échelle cible
    runSphereScaleTransition(new THREE.Vector3(scale, scale, scale), 800);
    sphere.rotation.x = (event.clientY / window.innerHeight) * 0.5;
    sphere.rotation.y = (event.clientX / window.innerWidth) * -2;
  });
  

// Créer une boucle de rendu
const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
