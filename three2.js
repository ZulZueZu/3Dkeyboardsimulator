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

        const keycapAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60keycap'));
        const plateAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60plate'));
        const pcbAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60pcb'));
        const stabiliserAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60stabiliser'));
        const switchAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60switch'));
        const textAction = mixer.clipAction(gltf.animations.find(clip => clip.name === '60text'));

        // Configure the animations to play only once
        keycapAction.setLoop(THREE.LoopOnce);
        plateAction.setLoop(THREE.LoopOnce);
        pcbAction.setLoop(THREE.LoopOnce);
        stabiliserAction.setLoop(THREE.LoopOnce);
        switchAction.setLoop(THREE.LoopOnce);
        textAction.setLoop(THREE.LoopOnce);

        // Set the animations to go slower
        //keycapAction.timeScale = 0.5; // Adjust the time scale as needed

        // Play the animations
        pcbAction.play();
        plateAction.play();
        switchAction.play();
        stabiliserAction.play();
        textAction.play();
        keycapAction.play();
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
loadKeyboard(4);

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


function animate() {
    requestAnimationFrame(animate);

    // Update animation mixer
    if (mixer) {
        mixer.update(0.05); // Adjust the time delta as needed
    }

    renderer.render(scene, camera);
}

animate();
