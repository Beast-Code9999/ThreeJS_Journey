/**
 * Expose the maps metadata
 * The 3D objects representing the map
 * Functions to expand and reset the map
 */

// by exporting map, other modules like main.js can add it to the scene 
// lets you move, rotate, or scel the entire map as a single object

import * as THREE from "three"
import { generateRows } from "../utilities/generateRows"
import { Grass } from "./Grass" // grass function that screst the grass rows
import { Road } from "./Road"
import { Tree } from "./Tree" // tree function that creates the tree objects
import { Car } from "./Car"
import { Truck } from "./Truck"


/**
 * metadata
 * array of objects that contain information about each row
 * has row "type" 
 * and its properties
 */
export const metadata = []


// acts as a container for all the rows with specific contents
export const map = new THREE.Group() // container for 3D objects

export function initialiseMap() {
    // Remove all rows and reset when initialise
    metadata.length = 0
    map.remove(...map.children)

    for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
        const grass = Grass(rowIndex)
        map.add(grass)
    }
    addRows()
}

// Generates 3D objects based on the metadata and adds them to the map container
// loops through each row in metadata
export function addRows() {
    const newMetaData = generateRows(20)
    
    const startIndex = metadata.length
    metadata.push(...newMetaData)

    newMetaData.forEach((rowData, index) => {
        const rowIndex = startIndex + index + 1; // starts after row 0 aka (initial grass row)

        // for forest
        if (rowData.type === "forest") { // if row is forest
            // create a gradd with the given row index
            const row = Grass(rowIndex)
            // loop through trees array
            // create the tree with the given tile index and height
            // add tree to the row group
            rowData.trees.forEach(({ tileIndex, height }) => {
                const tree = Tree(tileIndex, height)
                row.add(tree)
            })
            // add the completed row to the map group
            map.add(row)
        }


        // for car lanes
        if (rowData.type === "car") {
            const row = Road(rowIndex)
            
            rowData.vehicles.forEach((vehicle) => {
                const car = Car(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                )
                vehicle.ref = car
                row.add(car)
            })
            map.add(row)
        }

        // for trucks
        if (rowData.type === "truck") {
            const row = Road(rowIndex)
            
            rowData.vehicles.forEach((vehicle) => {
                const truck = Truck(
                    vehicle.initialTileIndex,
                    rowData.direction,
                    vehicle.color
                )
                vehicle.ref = truck
                row.add(truck);
            })
            map.add(row);
        }
    })
}