import * as THREE from 'three'
import { inject, provide } from 'vue'
import { CameraKey, RendererKey, SceneKey } from '@/types/InjectionKeys'

export const prepareScene = () => {
  const container = document.getElementById('sandbox') as HTMLElement
  const aspect = container.offsetWidth / container.offsetHeight
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.offsetWidth, container.offsetHeight)
  container.appendChild(renderer.domElement)

  camera.position.z = 5

  provide(SceneKey, scene)
  provide(CameraKey, camera)
  provide(RendererKey, renderer)
}

export const createCube = (): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xbbbbbb })
  const cube = new THREE.Mesh(geometry, material)
  const edgesGeometry = new THREE.EdgesGeometry(geometry)
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x0000000 })
  const cubeWireframe = new THREE.LineSegments(edgesGeometry, wireframeMaterial)

  cube.add(cubeWireframe)

  return cube
}

export const injectTools = () => ({
  camera: inject(CameraKey)!,
  scene: inject(SceneKey)!,
  renderer: inject(RendererKey)!
})
