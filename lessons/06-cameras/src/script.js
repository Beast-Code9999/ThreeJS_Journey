import * as THREE from 'three'

// Array camera: render the scene from multiple cameras 

// Stereo camera render the scene through two cameras that mimic the eyes to create parallax effect

// Cube camera the SubeCamera do 6 renders, each one facing a different direction

// Orthographic camera: Render the scene without perspective



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// 4 parameters: Vertical field of view in degrees, aspect ratio, near, far (the last two determines how near and far the field of view)
// const camera = new THREE.PerspectiveCamera(140, sizes.width / sizes.height, 0.1, 100)

const aspectRatio = sizes.width / sizes.height
// 6 paramters, left, right, top, bottom, near, far
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, 
    1 * aspectRatio,
    1, 
    -1, 
    0.1, 
    100)

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)




// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()