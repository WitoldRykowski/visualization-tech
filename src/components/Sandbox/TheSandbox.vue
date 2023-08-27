<script setup lang="ts">
import { Sandbox } from '@/services/SandboxService/sandbox.service'
</script>

<template>
  <component :is="Sandbox.state.playground?.component" />
</template>

<style scoped lang="scss"></style>
