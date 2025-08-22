import * as THREE from "three"

/**
 * Creates a directional light for the scene with shadows enabled.
 *
 * @returns {THREE.DirectionalLight} A Three.js directional light ready to be added to the scene.
 */
export function DirectionalLight() {
  // Create a new directional light (like sunlight)
  const dirLight = new THREE.DirectionalLight()

  // Position the light in the scene (X, Y, Z)
  dirLight.position.set(-100, -100, 200)

  // Set the "up" direction of the light (important for shadow camera orientation)
  dirLight.up.set(0, 0, 1)

  // Enable casting shadows
  dirLight.castShadow = true

  // Configure the resolution of the shadow map
  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048

  // Configure the shadow camera (orthographic camera used for directional light shadows)
  dirLight.shadow.camera.up.set(0, 0, 1) // Up vector for shadow camera
  dirLight.shadow.camera.left = -400     // Left boundary of the shadow camera
  dirLight.shadow.camera.right = 400     // Right boundary
  dirLight.shadow.camera.top = 400       // Top boundary
  dirLight.shadow.camera.bottom = -400   // Bottom boundary
  dirLight.shadow.camera.near = 50       // Near plane of shadow camera
  dirLight.shadow.camera.far = 400       // Far plane of shadow camera

  // Return the fully configured directional light
  return dirLight
}
