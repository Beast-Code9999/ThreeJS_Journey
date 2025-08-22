// Contasins the foundation and container of the car and truck lanes
// similar to grass function, it returns a group that contains a gray plane

import * as THREE from "three"
import { tilesPerRow, tileSize } from "../constants"

/**
 * Creates a horizontal road row at a given index in the map.
 *
 * @param {number} rowIndex - The row index along the Y-axis where the road will be placed.
 * @returns {THREE.Group} A Three.js group containing the road mesh.
 */
export function Road(rowIndex) {
    // Create a group to hold the road and any objects on it
    const road = new THREE.Group()

    // Position the entire road along the Y-axis based on its row index
    road.position.y = rowIndex * tileSize

    // Create the road foundation as a flat plane
    const foundation = new THREE.Mesh(
        // PlaneGeometry(width, height)
        // Width spans the entire row; height is one tile deep
        new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
        // Lambert material reacts to lights; dark grey color for asphalt
        new THREE.MeshLambertMaterial({
            color: '#454a59'
        })
    )

    foundation.receiveShadow = true // receive shadow rather than cast
    // Add the road foundation to the group
    road.add(foundation)

    // Return the complete road group so it can be added to the map
    return road
}