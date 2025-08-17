import * as THREE from 'three';

// canvas
const canvas = document.querySelector('canvas.webgl')

console.log("Javascript is here");
console.log(THREE);

// scene
const scene = new THREE.Scene()

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// camera = Theorerical point of view when rendering 
// PerspectiveCamera has two parameters : Field of view & aspect ratio


// sizes 

const sizes = {
    width: 800,
    height: 600
}


// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
camera.position.y = 1
camera.position.x = 1
// position
// scale
// rotation
// quaternion
scene.add(camera)


// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)