import { calculateFinalPosition } from "./calculateFinalPosition"
import { minTileIndex, maxTileIndex } from "../constants"
import { metadata as rows } from "../components/Map"

/**
 * Checks if the player will end up in a valid position
 * after applying a sequence of moves.
 * 
 * @param {Object} currentPosition - Current player position { rowIndex, tileIndex }
 * @param {string[]} moves - Array of moves to simulate
 * @returns {boolean} - True if the final position is valid, false otherwise
 */
export function endsUpInValidPosition(currentPosition, moves) {
  // Calculate the predicted final position after all moves
  const finalPosition = calculateFinalPosition(currentPosition, moves)

  // --- Check if the player hits the edge of the board ---
  if (
    finalPosition.rowIndex === -1 ||                 // Above the top boundary
    finalPosition.tileIndex === minTileIndex - 1 ||  // Left of the left boundary
    finalPosition.tileIndex === maxTileIndex + 1     // Right of the right boundary
  ) {
    return false // Invalid move, outside the board
  }

  // --- Check if the player hits a tree in a forest row ---
  const finalRow = rows[finalPosition.rowIndex - 1]       // Adjust for 0-based indexing
  if (
    finalRow &&
    finalRow.type === "forest" &&
    finalRow.trees.some(
      (tree) => tree.tileIndex === finalPosition.tileIndex // Tree occupies this tile
    )
  ) {
    return false // Invalid move, tree collision
  }

  // If no boundary or tree collisions, the position is valid
  return true
}
