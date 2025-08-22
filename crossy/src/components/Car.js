import * as THREE from "three"
import { tileSize } from "../constants"
import { Wheel } from "./Wheel"

/**
 * Creates a 3D car mesh with a main body, cabin, and wheels.
 *
 * @param {number} initialTileIndex - The starting tile index for the car along the X-axis.
 * @param {boolean} direction - Direction of the car: true = forward, false = backward (rotates the car 180° if false).
 * @param {string} color - Hex or named color for the car's main body.
 * @returns {THREE.Group} A Three.js group containing the complete car mesh.
 */
export function Car(initialTileIndex, direction, color) {
  // Create a group to hold all car parts
  const car = new THREE.Group()

  // Position the car along the X-axis based on its initial tile
  car.position.x = initialTileIndex * tileSize

  // Rotate the car 180° around Z-axis if moving in the opposite direction
  if (!direction) car.rotation.z = Math.PI

  // Create the main body of the car
  const main = new THREE.Mesh(
    // BoxGeometry(width, depth, height)
    new THREE.BoxGeometry(60, 30, 15),
    // Lambert material reacts to lights; color is customizable
    new THREE.MeshLambertMaterial({ 
        color, 
        flatShading: true })
  );
  // Raise the main body so it sits above the ground
  main.position.z = 12
  car.add(main)

  // Create the car's cabin (driver area)
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(33, 24, 12),
    new THREE.MeshLambertMaterial({
      color: "white", // cabin is white
      flatShading: true,
    })
  );
  // Slightly offset cabin backward along X and raise along Z
  cabin.position.x = -6
  cabin.position.z = 25.5
  car.add(cabin)

  // Add front wheel at positive X offset
  const frontWheel = Wheel(18)
  car.add(frontWheel)

  // Add back wheel at negative X offset
  const backWheel = Wheel(-18)
  car.add(backWheel)

  // Return the full car group ready to be added to a row or scene
  return car
}
