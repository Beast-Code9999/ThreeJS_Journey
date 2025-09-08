/**
 * This file will export the Camera function
 * Returns an orthographic camera that will be used to render the scene
 */
import * as THREE from "three"

export function Camera() {
  const viewRatio = window.innerWidth / window.innerHeight
  const size = 300

  const width = viewRatio < 1 ? size : size * viewRatio
  const height = viewRatio < 1 ? size / viewRatio : size

  const camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    0.1,
    1000
  )

  camera.up.set(0, 0, 1)
  camera.position.set(300, -300, 300)
  camera.lookAt(0, 0, 0)

  return camera
}
