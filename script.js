// Inicjalizacja
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Światła
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// OrbitControls (klasyczna wersja bez importu ES6)
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Uwaga: THREE.OrbitControls!
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Ładowanie modelu
const loader = new THREE.GLTFLoader();
loader.load(
    'touch-grass.glb',
    (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0); // Wymuś pozycję (0,0,0)
        scene.add(model);
        console.log("Model załadowany!");
    },
    undefined,
    (error) => console.error("Błąd ładowania:", error)
);

// Animacja
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Wymagane dla dampingu
    renderer.render(scene, camera);
}
animate();

// Responsywność
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});