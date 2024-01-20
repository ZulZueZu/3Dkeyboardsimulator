import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b1b1b);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 0.3, 0.1);


const loader = new GLTFLoader();
let currentKeyboardNum = 1; // Default animation
let mixer; // AnimationMixer

// Map keyboard size to clip name
const clipMappings = {
    1: "60stabiliser",
    2: "60plate",
    3: "60switch",
    4: "AllAction",
    5: "ScrewAction",
    6: "KeycapAction",
};

// Function to load the keyboard based on animation
function loadKeyboard(num) {
    loader.load(`keyboard_ani_${num}.glb`, function (gltf) {
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

        const clips = gltf.animations;

        // Use the mapping to get the clip name for the current keyboard size
        const clipName = clipMappings[num];

        if (clipName) {
            const clip = THREE.AnimationClip.findByName(clips, clipName);
            const action = mixer.clipAction(clip);
            action.timeScale = 0.5;
            action.setLoop(THREE.LoopOnce);
            action.play();
        } else {
            console.error(`Clip name not found for keyboard size: ${num}`);
        }
    }, undefined, function (error) {
        console.error(error);
    });
}

// Function to handle animation change
function changeNum(num) {
    currentKeyboardNum = num;
    loadKeyboard(currentKeyboardNum);
}

// Example buttons for different animations
const numButtons = document.querySelectorAll('.tuto-button');

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const num = parseInt(button.dataset.num);
        changeNum(num);
    });
});

// Initial load
loadKeyboard(currentKeyboardNum);

// Adjusted lights with reduced intensities
const light1 = new THREE.PointLight(0xffffff, 0.5, 10);
light1.position.set(0, 3, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 0.1, 10);
light2.position.set(0, 2, -2);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 2, 5);
light3.position.set(0, 2, 0);
scene.add(light3);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    // Update animation mixer
    if (mixer) {
        mixer.update(clock.getDelta()); // Adjust the time delta as needed
    }

    renderer.render(scene, camera);
}

animate();
