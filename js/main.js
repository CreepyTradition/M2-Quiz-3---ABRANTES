// Define global variables
let scene, camera, renderer;
let object, velocity;
let screenWidth = 800, screenHeight = 800;
let bounceCount = 0;
let isAnimating = true;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(screenWidth, screenHeight);
    document.body.appendChild(renderer.domElement);

    // Create a cube
    let geometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);

    // Set initial position
    object.position.set(0, 0, 0);

    // Set initial velocity
    velocity = new THREE.Vector3(1, 1, 0);

    animate();
}

// Animate the scene
function animate() {
    if (!isAnimating) return;

    requestAnimationFrame(animate);
    object.position.x += velocity.x;
    object.position.y += velocity.y;

    // Convert cube's position to screen coordinates
    let screenPosition = object.position.clone().project(camera);
    let xScreen = (screenPosition.x + 1) * screenWidth / 2;
    let yScreen = (-screenPosition.y + 1) * screenHeight / 2;

    // Check for collisions with the screen bounds
    if ((xScreen >= screenWidth - 1 || xScreen <= 1) && velocity.x !== 0) {
        velocity.x *= -1; 
        velocity.y = Math.random() * 0.1 - 0.07;
        object.material.color.setHex(Math.random() * 0xffffff);
        object.scale.multiplyScalar(0.5);
        bounceCount++;
    }
    if ((yScreen >= screenHeight - 1 || yScreen <= 1) && velocity.y !== 0) {
        velocity.y *= -1;
        velocity.x = Math.random() * 0.1 - 0.07;
        object.material.color.setHex(Math.random() * 0xffffff);
        object.scale.multiplyScalar(0.5);
        bounceCount++;
    }

    // If cube's dimensions become too small
    let objectSize = object.scale.x * object.scale.y * object.scale.z;
    if (objectSize < 0.000000001) {
        isAnimating = false;
    }

    // Render the scene
    renderer.render(scene, camera);
}

init();
