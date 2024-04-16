import * as THREE from "/node_modules/three/build/three.module.js";
import { GLTFLoader } from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer;
let planets = [];
let orbitAngle = 0;

const texto1 = document.getElementById("titulo");
const texto2 = document.getElementById("parrafo1");
const texto3 = document.getElementById("parrafo2");

// Inicializar Three.js y la escena
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 200;

    const backgroundLoader = new THREE.TextureLoader();
    const backgroundTexture = backgroundLoader.load("./background.jpg");
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, side: THREE.BackSide });
    const backgroundGeometry = new THREE.BoxGeometry(2560, 1440, 1000);
    const backgroundCube = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    scene.add(backgroundCube);

    // Cargar modelos 3D de los planetas
    const loader = new GLTFLoader();

    loader.load(
        '/planetas/scene.gltf',
        function (gltf) {
            gltf.scene.scale.set(10, 10, 10); // Escala del modelo
            gltf.scene.position.set(0, 0, 0); // Posición inicial
            scene.add(gltf.scene);
            planets.push(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    loader.load(
        '/planetas/scene.gltf',
        function (gltf) {
            gltf.scene.scale.set(5, 5, 5); // Escala del modelo
            gltf.scene.position.set(20, 0, 0); // Posición inicial
            scene.add(gltf.scene);
            planets.push(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    loader.load(
        '/planetas/scene.gltf',
        function (gltf) {
            gltf.scene.scale.set(7, 7, 7); // Escala del modelo
            gltf.scene.position.set(30, 0, 0); // Posición inicial
            scene.add(gltf.scene);
            planets.push(gltf.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    // Añadir eventos de mouse para la interactividad
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('wheel', onScroll, false);

    // Llamar a la función animate para comenzar la animación
    animate();
}

function onScroll(event){
    const delta = event.deltaY * 0.01;
    camera.position.z += delta;
}

// Función para actualizar la posición de la esfera según la posición del mouse
function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    camera.position.x = mouseX * 5;
    camera.position.y = mouseY * 5;
}

// Animación
function animate() {
    requestAnimationFrame(animate);
    updateOrbitPosition(); // Actualizar posición de los planetas en órbita
    updateOrbitVerticalRotation(); // Actualizar rotación vertical de las órbitas

    const cameraZ = camera.position.z;

    // Mostrar u ocultar los textos según la posición Z de la cámara
    if (cameraZ <= 190 && cameraZ >= 160) {
        texto1.style.opacity = '1'; // Mostrar texto 1
        texto2.style.opacity = '0'; // Ocultar texto 2
        texto3.style.opacity = '0'; // Ocultar texto 3
    } else if (cameraZ <= 155 && cameraZ >= 120) {
        texto1.style.opacity = '0'; // Ocultar texto 1
        texto2.style.opacity = '1'; // Mostrar texto 2
        texto3.style.opacity = '0'; // Ocultar texto 3
    } else if (cameraZ <= 115 && cameraZ >= 90) {
        texto1.style.opacity = '0'; // Ocultar texto 1
        texto2.style.opacity = '0'; // Ocultar texto 2
        texto3.style.opacity = '1'; // Mostrar texto 3
    } else {
        texto1.style.opacity = '0'; // Ocultar todos los textos
        texto2.style.opacity = '0';
        texto3.style.opacity = '0';
    }

    renderer.render(scene, camera);
}

// Función para actualizar la posición de los planetas en órbita
function updateOrbitPosition() {
    const speed = 0.01; // Velocidad de la órbita

    planets.forEach((planet, index) => {
        const radius = (index + 1) * 20; // Radio de la órbita
        const angle = Date.now() * speed * (index + 1) * 0.001; // Ángulo variable para la rotación

        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        planet.position.x = x;
        planet.position.z = z;
    });
}

// Función para actualizar la rotación vertical de las órbitas
function updateOrbitVerticalRotation() {
    orbitAngle += 0.01; // Incremento en el ángulo de rotación vertical

    planets.forEach(planet => {
        planet.position.y = 20 * Math.cos(orbitAngle); // Aplicar rotación vertical a la órbita del planeta
    });
}

// Llamar a la función init para comenzar
init();
