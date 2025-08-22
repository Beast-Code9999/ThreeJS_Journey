import * as THREE from "three"

export const player = Player();

function Player() {
    const body = new THREE.Mesh( // new THREE mesh.(geometry, material) combines geometry and material
        new THREE.BoxGeometry(15, 15, 20), // create a rectangular box with width 15, depth 15, height 20
        new THREE.MeshLambertMaterial({
            // Lambert material reacts to the lights in the scene
            color: "cyan",
            flatShading: true,
        })
    ) 
    body.position.z = 10 // adjust z axis slightly above "ground"

    return body 
}