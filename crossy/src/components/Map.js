/**
 * Expose the maps metadata
 * The 3D objects representing the map
 * Functions to expand and reset the map
 */

// by exporting map, other modules like main.js can add it to the scene 
// lets you move, rotate, or scel the entire map as a single object

import * as THREE from "three"
import { Grass } from "./Grass"


/**
 * metadata
 * array of objects that contain information about each row
 * has row "type" 
 * and its properties
 */
export const metadata = [
    {
        type: "forest",
        trees: [
            { tileIndex: -3, height: 50 },
            { tileIndex: 2, height: 30 },
            { tileIndex: 5, height: 50 },
        ],
    },
]


// acts as a container for all the rows with specific contents
export const map = new THREE.Group() // container for 3D objects

export function initialiseMap() {
    const grass = Grass(0)
    map.add(grass)
}