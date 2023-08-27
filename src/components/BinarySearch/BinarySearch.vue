<script setup lang="ts">
import { ArrayPlayground, SandboxUserPanel } from '@/components'
import { Sandbox } from '@/services/SandboxService/sandbox.service'
import { computed } from 'vue'
import type { BinarySearchPlayground } from '@/services/binary-search.service'

const state = computed(() => Sandbox.state.playground?.state as BinarySearchPlayground['state'])
</script>

<template>
  <div class="binary-search-container">
    <div class="playground">
      <ArrayPlayground :values="state.values" />
    </div>

    <SandboxUserPanel />
  </div>
</template>

<style scoped lang="scss">
.binary-search-container {
  @include flex-row(start, start, wrap);
  gap: 1rem;
}

.binary-search-container > .playground {
  flex: 2 1;
  min-width: 900px;
}
</style>
