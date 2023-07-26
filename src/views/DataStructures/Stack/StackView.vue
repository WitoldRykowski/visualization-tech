<script setup lang="ts">
import { onMounted } from 'vue'
import { useStack } from './useStack'
import { createCube, injectTools } from '@/services/three.service'

const { stack, addToStack, removeFromStack } = useStack()
const { scene, renderer, camera } = injectTools()

onMounted(() => {
  const cube = createCube()

  scene.add(cube)

  cube.rotation.x = 2
  cube.rotation.y = 0
  cube.rotation.z = 2

  renderer.render(scene, camera)
})
</script>

<template>
  <div>
    {{ stack }}
    <button @click="addToStack">Add</button>
    <button @click="removeFromStack">Remove</button>
  </div>
</template>

<style scoped lang="scss"></style>
