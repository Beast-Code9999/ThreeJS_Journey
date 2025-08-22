import * as THREE from "three"
import { metadata as rows } from "./components/Map"
import { player, position } from "./components/Player"

// DOM elements to show result and final score
const resultDOM = document.getElementById("result-container")
const finalScoreDOM = document.getElementById("final-score")

/**
 * Checks if the player collides with any vehicle in the current row.
 * If a collision is detected, displays the "game over" UI and shows the final score.
 */
export function hitTest() {
  // Get the row where the player currently is
  const row = rows[position.currentRow - 1] // -1 because array is 0-based
  if (!row) return // no row exists, exit early

  // Only check collisions for rows with vehicles
  if (row.type === "car" || row.type === "truck") {
    // Create a bounding box around the player
    const playerBoundingBox = new THREE.Box3()
    playerBoundingBox.setFromObject(player)

    // Check each vehicle in the row
    row.vehicles.forEach(({ ref }) => {
      if (!ref) throw Error("Vehicle reference is missing")

      // Create a bounding box around the vehicle
      const vehicleBoundingBox = new THREE.Box3()
      vehicleBoundingBox.setFromObject(ref)

      // Check if player intersects with vehicle
      if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
        // Collision detected → show result and final score
        if (!resultDOM || !finalScoreDOM) return
        resultDOM.style.visibility = "visible"
        finalScoreDOM.innerText = position.currentRow.toString()
      }
    })
  }
}
