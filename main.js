import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const listener = new THREE.AudioListener();
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b1b1b);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 0.4, 0.1);
camera.add(listener);

const audioloader = new THREE.AudioLoader();

const backgroundSound = new THREE.Audio(listener);
audioloader.load('./test.mp3', function(buffer){
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true);
    backgroundSound.setVolume(0.4);
    backgroundSound.play();
});

const akkoSound = new THREE.Audio(listener);
audioloader.load('./Akko_V3_Cream_Blue.mp3', function(buffer){
    akkoSound.setBuffer(buffer);
    akkoSound.setLoop(false);
    akkoSound.setVolume(1.0);
});

const gblueSound = new THREE.Audio(listener);
audioloader.load('./Gateron_Blue.mp3', function(buffer){
    gblueSound.setBuffer(buffer);
    gblueSound.setLoop(false);
    gblueSound.setVolume(1.4);
});

const gredSound = new THREE.Audio(listener);
audioloader.load('./Gateron_Red.mp3', function(buffer){
    gredSound.setBuffer(buffer);
    gredSound.setLoop(false);
    gredSound.setVolume(0.7);
});

const pandaSound = new THREE.Audio(listener);
audioloader.load('./HolyPanda.mp3', function(buffer){
    pandaSound.setBuffer(buffer);
    pandaSound.setLoop(false);
    pandaSound.setVolume(0.7);
});

const kailhSound = new THREE.Audio(listener);
audioloader.load('./Kailh_Box_Navy.mp3', function(buffer){
    kailhSound.setBuffer(buffer);
    kailhSound.setLoop(false);
    kailhSound.setVolume(1.0);
});

const mxblueSound = new THREE.Audio(listener);
audioloader.load('./Mxblue.mp3', function(buffer){
    mxblueSound.setBuffer(buffer);
    mxblueSound.setLoop(false);
    mxblueSound.setVolume(0.7);
});

const mxblackSound = new THREE.Audio(listener);
audioloader.load('./Mxblack.mp3', function(buffer){
    mxblackSound.setBuffer(buffer);
    mxblackSound.setLoop(false);
    mxblackSound.setVolume(0.7);
});

const mxbrownSound = new THREE.Audio(listener);
audioloader.load('./MXBrown.mp3', function(buffer){
    mxbrownSound.setBuffer(buffer);
    mxbrownSound.setLoop(false);
    mxbrownSound.setVolume(0.7);
});

const novelSound = new THREE.Audio(listener);
audioloader.load('./Novelkeys_Cream.mp3', function(buffer){
    novelSound.setBuffer(buffer);
    novelSound.setLoop(false);
    novelSound.setVolume(1.1);
});


const options = {
    'Case': 0x2AC3D1
}

/*const fs =  require('fs');
fs.readFile('output.txt', 'utf8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
});

const content = "something interesting"

fs.writeFile('output.txt', content, err => {
    if(err){
        console.err;
        return;
    }
});*/

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

        // Get all color inputs
        const colorInputs = document.querySelectorAll('input[name="case"]');

        // Array of object names to be updated
        const objectNames = ['Numpad', '40', '60_better', '65', '75', 'compact', 'tenkeyless', 'Full_100'];

        // Add event listener to each color input
        colorInputs.forEach((input) => {
            input.addEventListener('input', function () {
                const colorValue = this.value;
                
                // Iterate over object names and update colors
                objectNames.forEach((name) => {
                    const currentObject = model.getObjectByName(name);
                    
                    // Check if the object with the specified name exists
                    if (currentObject) {
                        currentObject.material.color.setStyle(colorValue);
                    }
                });
            });
        });

        // Get all color inputs for 'case'
        const caseColorInputs = document.querySelectorAll('input[name="case"]');
        // Array of object names for 'case' to be updated
        const caseObjectNames = ['Numpad', '40', '60', '65', '75', 'compact', 'tenkeyless', 'Full_100'];

        // Add event listener to each 'case' color input
        caseColorInputs.forEach((input) => {
            input.addEventListener('input', function () {
                const colorValue = this.value;
                console.log(`Case color: ${colorValue}`);

                // Iterate over 'case' object names and update colors
                caseObjectNames.forEach((name) => {
                    const currentObject = model.getObjectByName(name);

                    // Check if the object with the specified name exists
                    if (currentObject) {
                        currentObject.material.color.setStyle(colorValue);
                    }
                });
            });
        });

        // Get all color inputs for 'plate'
        const plateColorInputs = document.querySelectorAll('input[name="plate"]');
        // Array of object names for 'plate' to be updated
        const plateObjectNames = ['Numpad_plate', '40_plate', '60_plate', '65_plate', '75_plate', 'compact_plate', 'tenkeyless_plate', 'Full_100_plate',
                                '1.001', '2.001', '3.001', '4.001', '5.001', 'Enter', 'Home', 'PgDn', 'PgUp', 'Right', 'End', 'lock', 'ctrl_R', 'ctrl_L', 
                                'esc', 'Backspace', 'Back', 'Script_Logo', 'Right', 'Lower', 'Raise', '~', 'Del', 'Pause', 'Break', 'Scroll', 'Lock', 'Ins',
                                '`',
        ];

        // Add event listener to each 'plate' color input
        plateColorInputs.forEach((input) => {
            input.addEventListener('input', function () {
                const colorValue = this.value;
                console.log(`Lighting color: ${colorValue}`);

                // Iterate over 'plate' object names and update colors
                plateObjectNames.forEach((name) => {
                    const currentObject = model.getObjectByName(name);

                    // Check if the object with the specified name exists
                    if (currentObject) {
                        currentObject.material.color.setStyle(colorValue);
                    }
                });
            });
        });

        // Get all color inputs for 'keycap'
        const keycapColorInputs = document.querySelectorAll('input[name="keycaps"]');

        // Add event listener to each 'keycap' color input
        keycapColorInputs.forEach((input) => {
            input.addEventListener('input', function () {
                const colorValue = this.value;
                console.log(`Keycaps color: ${colorValue}`);

                // Iterate over all objects in the scene
                scene.traverse((object) => {
                    // Check if the object name starts with 'Cube'
                    if (object.name.startsWith('Cube')) {
                        object.material.color.setStyle(colorValue);
                    }
                });
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
loadKeyboard(3);

// Assuming you have a reference to the select element with id 'switchSoundSelect'
const switchSoundSelect = document.getElementById('switchSoundSelect');

// Add an event listener to the select element
switchSoundSelect.addEventListener('change', function () {
    const selectedValue = switchSoundSelect.value;
    playSwitchSound(selectedValue);
});

window.addEventListener(
    "keydown",
    (event) => {
        const selectedValue = switchSoundSelect.value;
        playSwitchSound(selectedValue);
    },
    true,
  );

  let currentSound = null;

// Function to play the selected switch sound
function playSwitchSound(selectedValue) {
    // Stop any currently playing sound
    if (currentSound) {
        currentSound.stop();
    }

    // Play the selected sound based on the option value
    switch (selectedValue) {
        case 'option1':
            // Play the corresponding sound for 'Clicky - Cherry MX Blue'
            currentSound = mxblueSound.play();
            break;
        case 'option2':
            // Play the corresponding sound for 'Clicky - Kailh Box Navies'
            currentSound = kailhSound.play();
            break;
        case 'option3':
            // Play the corresponding sound for 'Clicky - Gateron Blue'
            currentSound = gblueSound.play();
            break;
        case 'option4':
            // Play the corresponding sound for 'Tactile - Cherry MX Brown'
            currentSound = mxbrownSound.play();
            break;
        case 'option5':
            // Play the corresponding sound for 'Tactile - Holy Pandas'
            currentSound = pandaSound.play();
            break;
        case 'option6':
            // Play the corresponding sound for 'Tactile - Akko V3 Cream Blue'
            currentSound = akkoSound.play();
            break;
        case 'option7':
            // Play the corresponding sound for 'Linear - Cherry MX Black'
            currentSound = mxblackSound.play();
            break;
        case 'option8':
            // Play the corresponding sound for 'Linear - NovelKeys Cream'
            currentSound = novelSound.play();
            break;
        case 'option9':
            // Play the corresponding sound for 'Linear - Gateron Red Inks'
            currentSound = gredSound.play();
            break;
        default:
            // Default case, stop all sounds
            akkoSound.stop();
            gblueSound.stop();
            gredSound.stop();
            pandaSound.stop();
            kailhSound.stop();
            mxblackSound.stop();
            mxblueSound.stop();
            mxbrownSound.stop();
            novelSound.stop();
            backgroundSound.stop();
            break;
    }
        // If there's a new sound, resume it
        if (currentSound) {
            currentSound.play();
        }
    
}


// Adjusted lights with reduced intensities
const light1 = new THREE.PointLight(0xffffff, 5, 10);
light1.position.set(0, 3, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 1, 10);
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
