import * as THREE from "three"
import { movesQueue, stepCompleted } from "./components/Player"
import { player, position } from "./components/Player"
import { tileSize } from "./constants"

// Clock to measure how long each player movement step takes
const moveClock = new THREE.Clock(false)

export function animatePlayer() {
  // If there are no moves queued, do nothing
  if (!movesQueue.length) return

  // Start the clock if it’s not already running
  if (!moveClock.running) moveClock.start()

  const stepTime = 0.2 // Duration of a single step in seconds
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime)
  // progress goes from 0 → 1 over the step duration

  // Update player position and rotation smoothly based on progress
  setPosition(progress)
  setRotation(progress)

  // Once the step is complete (progress reached 1 or more)
  if (progress >= 1) {
    stepCompleted()    // Apply the movement to the player's state
    moveClock.stop()   // Reset the clock for the next move
  }
}

function setPosition(progress) {
  // Calculate starting position (based on current logical row/tile)
  const startX = position.currentTile * tileSize
  const startY = position.currentRow * tileSize

  // Default end position is same as start (no movement)
  let endX = startX
  let endY = startY

  // Determine the new target tile based on the queued move
  if (movesQueue[0] === "left") endX -= tileSize
  if (movesQueue[0] === "right") endX += tileSize
  if (movesQueue[0] === "forward") endY += tileSize
  if (movesQueue[0] === "backward") endY -= tileSize

  // Interpolate (lerp) between start and end based on progress (0 → 1)
  player.position.x = THREE.MathUtils.lerp(startX, endX, progress)
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress)

  // Add a jump arc using sine (peaks at mid-step, 0 at start & end)
  player.position.z = Math.sin(progress * Math.PI) * 8
  player.children[0].position.z = Math.sin(progress * Math.PI) * 8
}

function setRotation(progress) {
  // Default facing "forward"
  let endRotation = 0

  // Determine target facing direction based on move
  if (movesQueue[0] === "forward") endRotation = 0
  if (movesQueue[0] === "left") endRotation = Math.PI / 2
  if (movesQueue[0] === "right") endRotation = -Math.PI / 2
  if (movesQueue[0] === "backward") endRotation = Math.PI

  // Smoothly interpolate from current rotation to target rotation
  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  )
}
