import * as THREE from "three"
import { minTileIndex, maxTileIndex } from "../constants"

/**
 * Generate multiple rows of map metadata.
 * @param {number} amount - Number of rows to generate
 * @returns {Array} Array of row metadata objects
 */
export function generateRows(amount) {
  const rows = []

  for (let i = 0; i < amount; i++) {
    const rowData = generateRow()  // Generate a single row's metadata
    rows.push(rowData)
  }

  return rows
}

/**
 * Generate metadata for a single row.
 * Randomly selects row type and delegates to type-specific generator.
 * @returns {Object} Metadata for one row
 */
function generateRow() {
  const type = randomElement(["car", "truck", "forest"])  // Randomly pick a row type

  if (type === "car") return generateCarLaneMetadata()     // Generate car lane data
  if (type === "truck") return generateTruckLaneMetadata() // Generate truck lane data
  if (type === "forest") return generateForestMetadata()   // Generate forest row data
}

/**
 * Utility function to select a random element from an array
 * @param {Array} array - Array of items
 * @returns {*} Random element from the array
 */
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}


/**
 * Generates metadata for a forest row.
 * Randomly places a few trees without overlapping tiles.
 * 
 * @returns {Object} Forest row metadata { type: "forest", trees: [...] }
 */
function generateForestMetadata() {
  const occupiedTiles = new Set() // Keep track of tiles already occupied by a tree

  const trees = Array.from({ length: 4 }, () => { // Generate 4 trees per row
    let tileIndex

    // Pick a random tile index until an unoccupied one is found
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex)
    } while (occupiedTiles.has(tileIndex))

    // Mark this tile as occupied
    occupiedTiles.add(tileIndex)

    // Randomly pick a tree height from 3 options
    const height = randomElement([20, 45, 60])

    return { tileIndex, height } // Return tree metadata
  })

  return { type: "forest", trees } // Return the complete forest row metadata
}


/**
 * Generates metadata for a car lane row.
 * Randomly sets lane direction, speed, and vehicle positions/colors.
 * 
 * @returns {Object} Car lane metadata { type: "car", direction, speed, vehicles: [...] }
 */
function generateCarLaneMetadata() {
  // Randomly pick lane direction: true = right, false = left
  const direction = randomElement([true, false])

  // Random speed for vehicles (units per second)
  const speed = randomElement([125, 156, 188])

  // Keep track of tiles already occupied by vehicles
  const occupiedTiles = new Set()

  // Generate 3 vehicles for this lane
  const vehicles = Array.from({ length: 3 }, () => {
    let initialTileIndex

    // Pick a tile index that isn't already occupied by another vehicle
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex)
    } while (occupiedTiles.has(initialTileIndex))

    // Mark surrounding tiles as occupied to prevent overlap (vehicle width spans ~3 tiles)
    occupiedTiles.add(initialTileIndex - 1)
    occupiedTiles.add(initialTileIndex)
    occupiedTiles.add(initialTileIndex + 1)

    // Pick a random color for visual variety
    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b])

    return { initialTileIndex, color }
  })

  return { type: "car", direction, speed, vehicles }
}


/**
 * Generates metadata for a truck lane row.
 * Randomly sets lane direction, speed, and truck positions/colors.
 * 
 * @returns {Object} Truck lane metadata { type: "truck", direction, speed, vehicles: [...] }
 */
function generateTruckLaneMetadata() {
  // Randomly pick lane direction: true = right, false = left
  const direction = randomElement([true, false])

  // Random speed for trucks (units per second)
  const speed = randomElement([125, 156, 188])

  // Keep track of tiles already occupied by trucks
  const occupiedTiles = new Set()

  // Generate 2 trucks for this lane
  const vehicles = Array.from({ length: 2 }, () => {
    let initialTileIndex

    // Pick a tile index that isn't already occupied by another truck
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex)
    } while (occupiedTiles.has(initialTileIndex))

    // Mark surrounding tiles as occupied to prevent overlap
    // Trucks are larger than cars, so they occupy ~5 tiles width
    occupiedTiles.add(initialTileIndex - 2)
    occupiedTiles.add(initialTileIndex - 1)
    occupiedTiles.add(initialTileIndex)
    occupiedTiles.add(initialTileIndex + 1)
    occupiedTiles.add(initialTileIndex + 2)

    // Pick a random color for visual variety
    const color = randomElement([0xa52523, 0xbdb638, 0x78b14b])

    return { initialTileIndex, color }
  })

  return { type: "truck", direction, speed, vehicles }
}
