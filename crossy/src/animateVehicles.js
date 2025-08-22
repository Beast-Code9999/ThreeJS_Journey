import * as THREE from "three"
import { metadata as rows } from "./components/Map"
import { minTileIndex, maxTileIndex, tileSize } from "./constants"

// Clock used to measure time between frames (delta time)
const clock = new THREE.Clock()

/**
 * Animate all vehicles (cars and trucks) across the map.
 * Updates their positions frame-by-frame based on speed, direction, and time elapsed.
 */
export function animateVehicles() {
  // Get time passed since last frame (in seconds)
  const delta = clock.getDelta()

  // Iterate over each row of the map (metadata contains info like type, speed, direction, vehicles)
  rows.forEach((rowData) => {
    if (rowData.type === "car" || rowData.type === "truck") {
      // Calculate horizontal boundaries for this row
      const beginningOfRow = (minTileIndex - 2) * tileSize
      const endOfRow = (maxTileIndex + 2) * tileSize

      // Update each vehicle in this row
      rowData.vehicles.forEach(({ ref }) => {
        if (!ref) throw Error("Vehicle reference is missing")

        // If direction = true → move right
        if (rowData.direction) {
          // Wrap vehicle back to start if it goes past end of row
          ref.position.x =
            ref.position.x > endOfRow
              ? beginningOfRow
              : ref.position.x + rowData.speed * delta
        } 
        // If direction = false → move left
        else {
          // Wrap vehicle back to end if it goes past beginning of row
          ref.position.x =
            ref.position.x < beginningOfRow
              ? endOfRow
              : ref.position.x - rowData.speed * delta
        }
      })
    }
  })
}
