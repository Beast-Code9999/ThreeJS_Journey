import * as THREE from "three"
import { tileSize } from "../constants"
import { Wheel } from "./Wheel"

/**
 * Creates a 3D truck mesh with a cargo section, cabin, and three wheels.
 *
 * @param {number} initialTileIndex - The starting tile index for the truck along the X-axis.
 * @param {boolean} direction - Direction of the truck: true = forward, false = backward (rotates the truck 180° if false).
 * @param {string|number} color - Hex or named color for the truck's cabin.
 * @returns {THREE.Group} A Three.js group containing the complete truck mesh.
 */
export function Truck(initialTileIndex, direction, color) {
  // Create a group to hold all truck parts
  const truck = new THREE.Group()

  // Position the truck along the X-axis based on its initial tile
  truck.position.x = initialTileIndex * tileSize

  // Rotate the truck 180° around Z-axis if moving in the opposite direction
  if (!direction) truck.rotation.z = Math.PI

  // Create the cargo section of the truck
  const cargo = new THREE.Mesh(
    new THREE.BoxGeometry(70, 35, 35), // width, depth, height
    new THREE.MeshLambertMaterial({
      color: 0xb4c6fc, // light blue color for cargo
      flatShading: true
    })
  )
  // Position cargo slightly behind and above the truck's origin
  cargo.position.x = -15
  cargo.position.z = 25
  cargo.castShadow = true
  cargo.receiveShadow = true
  truck.add(cargo)

  // Create the cabin of the truck
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(30, 30, 30), // width, depth, height
    new THREE.MeshLambertMaterial({ color, flatShading: true }) // customizable color
  )
  // Position cabin slightly forward and above the truck's origin
  cabin.position.x = 35
  cabin.position.z = 20
  cabin.castShadow = true
  cabin.receiveShadow = true
  truck.add(cabin)

  // Add wheels at appropriate X offsets
  const frontWheel = Wheel(37)
  truck.add(frontWheel)

  const middleWheel = Wheel(5)
  truck.add(middleWheel)

  const backWheel = Wheel(-35)
  truck.add(backWheel)

  // Return the full truck group ready to be added to a row or scene
  return truck
}
