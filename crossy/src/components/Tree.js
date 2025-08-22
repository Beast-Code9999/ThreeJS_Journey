import * as THREE from "three"
import { tileSize } from "../constants" // size of a single tile

/**
 * Creates a 3D tree mesh group (trunk + crown) at a specific tile.
 *
 * @param {number} tileIndex - The column index where the tree should be placed.
 * @param {number} height - The height of the tree's crown (green top).
 * @returns {THREE.Group} - A Three.js group containing the tree mesh.
 */
export function Tree(tileIndex, height) { 
    const tree = new THREE.Group()
    tree.position.x = tileIndex * tileSize 

    const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(15, 15, 20),
        new THREE.MeshLambertMaterial({
            color: '#4d2926',
            flatShading: true
        })
    )
    trunk.position.z = 10;
    tree.add(trunk)

    const crown = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, height),
        new THREE.MeshLambertMaterial({
            color: '#7aa21d',
            flatShading: true
        })
    )
    crown.position.z = height / 2 + 20
    tree.add(crown)

    return tree;
}