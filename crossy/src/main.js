import * as THREE from "three"
import { Renderer } from "./components/Renderer"
import { Camera } from "./components/Camera"
import { DirectionalLight } from "./components/directionalLight"
import { player } from "./components/Player"
import { map, initialiseMap } from "./components/Map"
import { animateVehicles } from "./animateVehicles"
import { animatePlayer } from "./animatePlayer"
import "./style.css"
import "./collectUserInput"

const scene = new THREE.Scene()
scene.add(player)
scene.add(map)

// add lighting
// do both ambient and direct
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)
const dirLight = DirectionalLight()
// dirLight.position.set(-100, -100, 200)
dirLight.target = player
// scene.add(dirLight)
player.add(dirLight)

const camera = Camera()
// scene.add(camera)
player.add(camera)

// initiation

initialiseGame() // must be called before we render the scene 
// else empty map will be rendererd

function initialiseGame() {
  initialiseMap()
}

const renderer = Renderer()
// renderer.render(scene, camera)

// Tell the renderer to use the animate() function as the render loop
// This is like requestAnimationFrame but optimized for VR/AR/WebXR as well.
renderer.setAnimationLoop(animate)

/**
 * The main animation loop.
 * Called automatically every frame (~60 times per second).
 */
function animate() {
  // Update vehicle positions, movement, or logic
  animateVehicles()
  animatePlayer()

  // Render the scene from the camera's perspective
  renderer.render(scene, camera)
}