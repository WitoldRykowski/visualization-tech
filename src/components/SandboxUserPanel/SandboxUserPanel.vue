<script setup lang="ts">
import { computed } from 'vue'
import { Sandbox } from '@/services/SandboxService/sandbox.service'
import { QBtn } from 'quasar'

const isRunning = computed(() => Sandbox.state.isRunning.value)
</script>

<template>
  <div class="user-panel">
    <div v-if="isRunning" class="user-panel-overlay" />

    <slot />

    <QBtn class="visualize-btn" @click="Sandbox.state.visualize">Visualize!</QBtn>
  </div>
</template>

<style scoped lang="scss">
.user-panel {
  position: relative;
  flex: 1 1;
}

.user-panel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1d1d1d;
  opacity: 0.5;
}

.visualize-btn {
  width: 100%;
}
</style>
