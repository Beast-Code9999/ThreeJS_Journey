/**
 * Creates a THREE JS Renderer that we can use to render the scene
 */

// Capital letters are used for functions that return THREE JS objects

import * as THREE from "three"

export function Renderer() {
  const canvas = document.querySelector("canvas.game")
  if (!canvas) throw new Error("Canvas not found")

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  return renderer
}
