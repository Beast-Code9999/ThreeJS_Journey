// Import the function to add moves into the player's movement queue
import { queueMove } from "./components/Player"

// --- Button Controls ---
// Add click listeners for movement buttons (if they exist in the DOM)

document
  .getElementById("forward")
  ?.addEventListener("click", () => queueMove("forward"))

document
  .getElementById("backward")
  ?.addEventListener("click", () => queueMove("backward"))

document
  .getElementById("left")
  ?.addEventListener("click", () => queueMove("left"))

document
  .getElementById("right")
  ?.addEventListener("click", () => queueMove("right"))


// --- Keyboard Controls ---
// Add keyboard listeners for arrow keys to trigger movement
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault()           // Prevents default scrolling
    queueMove("forward")
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    queueMove("backward")
  } else if (event.key === "ArrowLeft") {
    event.preventDefault()
    queueMove("left")
  } else if (event.key === "ArrowRight") {
    event.preventDefault()
    queueMove("right")
  }
})
