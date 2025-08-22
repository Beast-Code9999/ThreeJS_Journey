/**
 * Creates a THREE JS Renderer that we can use to render the scene
 */

// Capital letters are used for functions that return THREE JS objects

import * as THREE from "three"

export function Renderer() {
    // Select the canvas element in HTML 
    const canvas = document.querySelector("canvas.game")
    // throw an error if canvas is not found
    if (!canvas) throw new Error("Canvas not found")

    // create a renderer responsible for 3D scene on the screen
    // the objects control how the renderer behaves
    const renderer = new THREE.WebGLRenderer({
        alpha: true, // canvas transparent
        antialias: true, // smoother edges on 3D obejects
        canvas: canvas // sets the canvas
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerHeight, window.innerHeight)

    return renderer
}