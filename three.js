import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b1b1b);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 0.3, 0.1);

const gui = new GUI();

const options = {
    'Case': 0x2AC3D1
}

const loader = new GLTFLoader();
let currentKeyboardSize = 1; // Default size
let mixer; // AnimationMixer

// Function to load the keyboard based on size
function loadKeyboard(size) {
    loader.load(`keyboard_size_${size}.glb`, function (gltf) {
        // Clear existing objects in the scene
        scene.children.forEach((child) => {
            if (child.type === 'Group') {
                scene.remove(child);
            }
        });

        // Add the new keyboard model to the scene
        const model = gltf.scene;
        scene.add(model);

        // Set up animation mixer
        mixer = new THREE.AnimationMixer(model);

        // Example: Play animation clip named "SpaceBarPress"
        // const spaceBarPressAction = mixer.clipAction(gltf.animations.find(clip => clip.name === 'SpaceBarPress'));
        // spaceBarPressAction.play();

        // Get all color inputs
        const colorInputs = document.querySelectorAll('input[name="case"]');

        // Add event listener to each color input
        colorInputs.forEach((input) => {
            input.addEventListener('input', function () {
                const colorValue = this.value;
                model.getObjectByName('Numpad').material.color.setStyle(colorValue);
            });
        });
    });
}

// Function to handle size change
function changeSize(size) {
    currentKeyboardSize = size;
    loadKeyboard(currentKeyboardSize);
}

// Example buttons for different sizes
const sizeButtons = document.querySelectorAll('.size-button');

sizeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const size = parseInt(button.dataset.size);
        changeSize(size);
    });
});

// Initial load
loadKeyboard(currentKeyboardSize);

// Adjusted lights with reduced intensities
const light1 = new THREE.PointLight(0xffffff, 50, 10);
light1.position.set(0, 3, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 10, 10);
light2.position.set(0, 2, -2);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 2, 5);
light3.position.set(0, 2, 0);
scene.add(light3);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);

function animate() {
    requestAnimationFrame(animate);

    // Update animation mixer
    if (mixer) {
        mixer.update(0.1); // Adjust the time delta as needed
    }

    renderer.render(scene, camera);
}

animate();
