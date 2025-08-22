import * as THREE from "three"
import { Renderer } from "./components/Renderer"
import { Camera } from "./components/Camera"
import { DirectionalLight } from "./components/directionalLight"
import { player } from "./components/Player"
import { map, initialiseMap } from "./components/Map"
import "./style.css"

const scene = new THREE.Scene()
scene.add(player)
scene.add(map)

// add lighting
// do both ambient and direct
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)
const dirLight = DirectionalLight()
dirLight.position.set(-100, -100, 200)
scene.add(dirLight)

const camera = Camera()
scene.add(camera)

// initiation

initialiseGame() // must be called before we render the scene 
// else empty map will be rendererd

function initialiseGame() {
  initialiseMap()
}

const renderer = Renderer()
renderer.render(scene, camera)