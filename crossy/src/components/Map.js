/**
 * Expose the maps metadata
 * The 3D objects representing the map
 * Functions to expand and reset the map
 */

// by exporting map, other modules like main.js can add it to the scene 
// lets you move, rotate, or scel the entire map as a single object

import * as THREE from "three"
import { Grass } from "./Grass" // grass function that screst the grass rows
import { Tree } from "./Tree" // tree function that creates the tree objects


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
    // creates first row
    const grass = Grass(0)
    map.add(grass)
    addRows() // generate additional rows from metadata
}

// Generates 3D objects based on the metadata and adds them to the map container
// loops through each row in metadata
export function addRows() {
    metadata.forEach((rowData, index) => {
        const rowIndex = index + 1; // starts after row 0 aka (initial grass row)

        if (rowData.type === "forest") { // if row is forest
            // create a gradd with the given row index
            const row = Grass(rowIndex)
            // loop through trees array
            // create the tree with the given tile index and height
            // add tree to the row group
            rowData.trees.forEach(({ tileIndex, height }) => {
                const three = Tree(tileIndex, height)
                row.add(three)
            })
            // add the completed row to the map group
            map.add(row)
        }
    })
}