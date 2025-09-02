// unit in metres

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/** 
 * TEXTURES
 */
const textureLoader = new THREE.TextureLoader()

// texture for floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/aerial_rocks_02_1k/textures/aerial_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/aerial_rocks_02_1k/textures/aerial_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/aerial_rocks_02_1k/textures/aerial_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/aerial_rocks_02_1k/textures/aerial_rocks_02_disp_1k.jpg')
// after creating the textures, use it in the material section of the mesh

// always add this to make te colour true to its texture
floorColorTexture.colorSpace = THREE.SRGBColorSpace

// but first play around with the texture settings, like sometimes textures are too big, so you gotta repeat them
floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping


// wall texture
const wallColorTexture = textureLoader.load('./wall/brick_wall_13_1k/textures/brick_wall_13_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/brick_wall_13_1k/textures/brick_wall_13_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/brick_wall_13_1k/textures/brick_wall_13_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace


// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/textures/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

// use repeat on the x axis to make it look better
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// bushes
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/textures/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

// use repeat on the x axis to make it look better
bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping


// Gravev
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/textures/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

// use repeat on the x axis to make it look better
graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)



// door
const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace



/**
 * House
 */
const houseMeasurements = {
    // generally you would want to put all of the measurements here
}

// // Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// scene.add(sphere)


// create the floor
const floor = new THREE.Mesh(
    // Geometry
    new THREE.PlaneGeometry(20, 20, 100, 100),
    // material
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.2,
        displacementBias: -0.2
    })
)
// rotate the floor in the x axis
floor.rotation.x = Math.PI * 0.5
scene.add(floor)

gui
    .add(floor.material, 'displacementScale')
    .min(0)
    .max(1)
    .step(0.001)
    .name('FloorDisplacementScale')

gui
    .add(floor.material, 'displacementBias')
    .min(-1)
    .max(1)
    .step(0.001)
    .name('FloordisplacementBias')

// House container
const houseGroup = new THREE.Group()
scene.add(houseGroup)


// create the walls of the house
const walls = new THREE.Mesh(
    // geometry
    new THREE.BoxGeometry(4, 2.5, 4),
    // material
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,

    })
)
walls.position.y += 1.25 // half of the height
houseGroup.add(walls) // add walls to the house group

// create the roof the house
const roof = new THREE.Mesh(
    //geometry
    new THREE.ConeGeometry(3.5, 1.5, 4),
    
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
    })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI / 4
houseGroup.add(roof)


// create the door of the house
const door = new THREE.Mesh(
    // Geometry
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    // material
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: - 0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)
door.position.y = 1
// to avoid z-fighting glitch where mathematically two objects are in the same position
// we can slgihtly move obe of the object away
// in this case the z position of the door 
// to avoid z-fighting with the wall
door.position.z = 2 + 0.01
houseGroup.add(door)



// add bushes on the scene
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: 'lightgreen',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1.4, 0.1, 2.1)
bush3.rotation.x = -0.75


const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.2, 0.2, 0.2)
bush4.position.set(-1.4, 0.1, 2.5)
bush4.rotation.x = -0.75


// add all of the bushes to the houseGroup
houseGroup.add(bush1, bush2, bush3, bush4)



// create graves
// use one geometry and one material for the graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 40; i++) {
    // create an angle variable between zero and a full circle
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 4

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    // create 40 graves
    const grave = new THREE.Mesh(
        graveGeometry,
        graveMaterial
    ) 
    grave.position.x = x
    grave.position.z = z
    grave.position.y = Math.random() * 0.4
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
houseGroup.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4 
    ghost1.position.z = Math.sin(ghost1Angle) * 4

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()