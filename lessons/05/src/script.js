import * as THREE from 'three'

console.log("Hellow world")

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = 1
mesh.position.z = 1
scene.add(mesh)
// usually put position after greating the object

console.log(mesh.position.length())
// position.distanceTo()
// position.normalize()

// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// scale
// mesh.scale.x = 2
mesh.scale.set(2, 0.5, 0.5)

// ROTATION
mesh.rotation  

mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI  / 2
mesh.rotation.y = Math.PI  / 1
mesh.rotation.z = Math.PI  / 2





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)


// tell camera to look at object
camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)