/**
 * Expose the maps metadata
 * The 3D objects representing the map
 * Functions to expand and reset the map
 */

// by exporting map, other modules like main.js can add it to the scene 
// lets you move, rotate, or scel the entire map as a single object

import * as THREE from "three"
import { Grass } from "./Grass"

// acts as a container for all the rows with specific contents
export const map = new THREE.Group() // container for 3D objects

export function initialiseMap() {
    const grass = Grass(0)
    map.add(grass)
}