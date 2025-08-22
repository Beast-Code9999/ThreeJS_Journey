import * as THREE from "three"
import { endsUpInValidPosition } from "../utilities/endsUpInvalidPosition";
import { metadata as rows, addRows } from "./Map"

export const player = Player();

function Player() {
    const player = new THREE.Group()
    
    const body = new THREE.Mesh( // new THREE mesh.(geometry, material) combines geometry and material
        new THREE.BoxGeometry(15, 15, 20), // create a rectangular box with width 15, depth 15, height 20
        new THREE.MeshLambertMaterial({
            // Lambert material reacts to the lights in the scene
            color: "white",
            flatShading: true,
        })
    ) 
    body.position.z = 10 // adjust z axis slightly above "ground"
    body.castShadow = true
    body.receiveShadow = true
    // Add the main body mesh (created elsewhere) to the player group
    player.add(body)

    // Create a "cap" mesh (looks like a hat or head part of the player)
    const cap = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2), // Small box shape
    new THREE.MeshLambertMaterial({
        color: 0xf0619a, // Pinkish color
        flatShading: true, // Flat surfaces, no smooth shading
    })
    )

    // Position the cap above the body
    cap.position.z = 21

    // Enable shadows for realism
    cap.castShadow = true   // Cap will cast a shadow
    cap.receiveShadow = true // Cap can also receive shadows from other objects

    // Add the cap to the player group
    player.add(cap)

    // Return the complete player group with body + cap
    const plyaerContainer = new THREE.Group()
    plyaerContainer.add(player)

    return plyaerContainer
}

// Keeps track of the player's current position on the grid
export const position = {
    currentRow: 0,   // Row index (increases when moving forward)
     currentTile: 0,  // Tile index (increases when moving right)
}

// Queue of moves waiting to be executed
export const movesQueue = []

/**
 * Adds a movement direction to the queue.
 * @param {string} direction - One of "forward", "backward", "left", "right"
 */
export function queueMove(direction) {
    // Check if the next move (or sequence of queued moves) would land in a valid position
    const isValidMove = endsUpInValidPosition(
    {
        rowIndex: position.currentRow,  // Current row of the player
        tileIndex: position.currentTile, // Current tile of the player
    },
    [...movesQueue, direction]       // Simulate the move queue plus the new intended direction
    )

    // If the move would result in an invalid position (out of bounds or tree collision), ignore it
    if (!isValidMove) return

    
    movesQueue.push(direction)
}

// Keep track of the highest row reached
let highestRowReached = 0;

/**
 * Marks a step as completed by removing the first move in the queue
 * and updating the player's position accordingly.
 */

export function stepCompleted() {
    // Take the next move from the queue
    const direction = movesQueue.shift();
    
    // Update position based on move
    if (direction === "forward") position.currentRow += 1;
    if (direction === "backward") position.currentRow -= 1;
    if (direction === "left") position.currentTile -= 1;
    if (direction === "right") position.currentTile += 1;
    
    // Add new rows if the player is running out of them
    if (position.currentRow > rows.length - 10) addRows();
    
    // Update the highest row reached
    if (position.currentRow > highestRowReached) {
      highestRowReached = position.currentRow;
    }
    
    // Update the score display
    const scoreDOM = document.getElementById("score");
    if (scoreDOM) scoreDOM.innerText = highestRowReached.toString();
}
