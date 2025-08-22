import * as THREE from "three"
import { tilesPerRow, tileSize } from "../constants"

// a factory function that creates grass row at a specific row index
// rowIndex parameter represents the posittion along the y axis
export function Grass(rowIndex) {
    const grass = new THREE.Group() // container that holds multiple 3D objects
    grass.position.y = rowIndex * tileSize 
    
    const foundation = new THREE.Mesh(
        new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
        new THREE.MeshLambertMaterial({
            color: '#baf455'
        })
    )
    foundation.position.z = 1.5; // a bit of a height so it sticks out compared to a road
    grass.add(foundation)

    return grass
}