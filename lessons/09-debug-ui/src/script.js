import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/*
While you can create your own debug UI using HTML / CSS / JS, there are already multiple libraries:

dat.GUI
lil-gui
control-panel
ControlKit
Uil
Tweakpane
Guify
Oui

*/

/* create a debugging object */
const debugObject = {}

const gui = new GUI( {
    width: 340,
    title: 'Nice debug UI',
    closeFOlders: false
})
gui.hide()
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)
})



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#ff0000';

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// create a folder for tweaks
const cubeTweaks = gui.addFolder('Awesome cube') // instead of using gui.add etc you can use cubeTweak.add etc


// two parameters: the object and the property
// in this case mesh.position is the object 
// y is the property
// 3rd parameter is minimum value, 4th is maximum, 5th is step like the position
// gui.add( object, 'property' );
// gui.add( object, 'number', 0, 100, 1 );
// gui.add( object, 'options', [ 1, 2, 3 ] );
// or you can add the parameters using the dot operator
cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation');

cubeTweaks
    .add(mesh, 'visible');

cubeTweaks
    .add(material, 'wireframe');


cubeTweaks
    .addColor(debugObject, 'color')
    // fixing colour inaccuracies of threejs
    .onChange(() =>
    {
        material.color.set(debugObject.color)
    })

// creating a fucntion outside of Three JS 
debugObject.spin = () => {
    gsap.to(mesh.rotation, {
        y: mesh.rotation.y + Math.PI * 2
    })
}
// now add it 
cubeTweaks
    .add(debugObject, 'spin') // object, property


// add widgets
debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() =>
    {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()