import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)

// request animation fram is to call the function provided on the next frame

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// Solution 1: using current time and delta time
// let time = Date.now()

// Solution 2: Clock
const clock = new THREE.Clock()


// solution 3 
// 2 paratmeters: the object we are animating, destination
gsap.to(mesh.position, {
    duration: 1,
    delay: 1,
    x: 2
})
gsap.to(mesh.position, {
    duration: 1,
    delay: 2,
    x: 0
})

// animation
const tick = () => {
    // // adapt the frame rate to have more consistency
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime // prepares for the next tick

    // console.log('tick')

    // // update objexts
    // mesh.rotation.x += 0.001 * deltaTime


    // solution 2
    // const elsapseTime = clock.getElapsedTime()

    // // update the object
    // mesh.position.y = Math.sin(elsapseTime)
    // mesh.position.x = Math.cos(elsapseTime)



    // solution 3 use a library


    // render
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick)
}

tick()