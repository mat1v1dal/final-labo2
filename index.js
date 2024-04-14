import * as THREE from 'three';

let scene, camera, renderer;

let sphere;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 50;

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    createBody();
    document.addEventListener('mousemove', onMouseMove, false);
    animate();
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function onMouseMove(event){
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    sphere.position.x = mouseX * 10;
    sphere.position.y = mouseY * 10;
}


function createBody(){
    const geometry = new THREE.SphereBufferGeometry(5, 32, 32); // Utilizamos SphereBufferGeometry para partículas

    const vertices = geometry.attributes.position.array; // Obtenemos los vértices de la geometría
    const particlesGeometry = new THREE.BufferGeometry();

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // Añadimos atributo de posición

    const material = new THREE.PointsMaterial({ color: 0xffff00, size: 0.2 });
    sphere = new THREE.Points(particlesGeometry, material);
    scene.add(sphere);
}

init();