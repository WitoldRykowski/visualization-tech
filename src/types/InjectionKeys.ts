import { type InjectionKey } from 'vue'
import * as THREE from 'three'

export const SceneKey = Symbol() as InjectionKey<THREE.Scene>

export const CameraKey = Symbol() as InjectionKey<THREE.Camera>

export const RendererKey = Symbol() as InjectionKey<THREE.Renderer>
