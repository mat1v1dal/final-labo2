import * as THREE from "../node_modules/three/build/three.module.js";

let scene, camera, renderer;
let sphere;
let particlesGeometry; // Variable para la geometría de partículas
let particles;

// Inicializar Three.js y la escena
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 50;

    // Crear esfera de partículas
    createParticleSphere();

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
// Función para crear la esfera de partículas
function createParticleSphere() {
    const geometry = new THREE.BufferGeometry();

    const vertices = [];
    const particleCount = 1000;
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 5;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xffff00, size: 0.2 });
    particlesGeometry = geometry; // Guardar la geometría de partículas
    particles = new THREE.Points(particlesGeometry, material);
    scene.add(particles);
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function updateParticlesPosition() {
    const positions = particlesGeometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.random() * 0.1 - 0.05; // Movimiento aleatorio en el eje X
        positions[i + 1] += Math.random() * 0.1 - 0.05; // Movimiento aleatorio en el eje Y
        positions[i + 2] += Math.random() * 0.1 - 0.05; // Movimiento aleatorio en el eje Z

        // Puedes agregar restricciones adicionales aquí para evitar que las partículas salgan de ciertos límites
    }

    particlesGeometry.attributes.position.needsUpdate = true; // Actualizar la geometría de las partículas
}


// Función para actualizar la posición de la esfera según la posición del mouse
function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    sphere.position.x = mouseX * 10;
    sphere.position.y = mouseY * 10;
}

// Animación
function animate() {
    requestAnimationFrame(animate);
    updateParticlesPosition();
    renderer.render(scene, camera);
}

// Llamar a la función init para comenzar
init();