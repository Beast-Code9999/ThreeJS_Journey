/**
 * Calculates the final position of a player after executing a series of moves.
 * 
 * @param {Object} currentPosition - The starting position { rowIndex, tileIndex }
 * @param {string[]} moves - Array of moves ("forward", "backward", "left", "right")
 * @returns {Object} - The final position after applying all moves
 */
export function calculateFinalPosition(currentPosition, moves) {
  return moves.reduce((position, direction) => {
    // Move forward increases the row index
    if (direction === "forward")
      return {
        rowIndex: position.rowIndex + 1,
        tileIndex: position.tileIndex,
      }

    // Move backward decreases the row index
    if (direction === "backward")
      return {
        rowIndex: position.rowIndex - 1,
        tileIndex: position.tileIndex,
      }

    // Move left decreases the tile index
    if (direction === "left")
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex - 1,
      }

    // Move right increases the tile index
    if (direction === "right")
      return {
        rowIndex: position.rowIndex,
        tileIndex: position.tileIndex + 1,
      }

    // If the move is invalid, ignore it and return the current position
    return position
  }, currentPosition) // Start reducing from the current position
}
