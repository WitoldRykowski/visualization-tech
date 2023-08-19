<script setup lang="ts">
import { Sandbox } from '@/services/SandboxService/sandbox.service'
</script>

<template>
  <button @click="Sandbox.setDelay(500)">T</button>
  <button @click="Sandbox.state.visualize()">B</button>

  <component :is="Sandbox.state.playground?.component" />
</template>

<style scoped lang="scss"></style>
