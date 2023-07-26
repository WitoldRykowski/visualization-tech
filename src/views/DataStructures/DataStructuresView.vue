<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { prepareScene } from '@/services/three.service'

const isLoaded = ref(false)

onMounted(() => {
  prepareScene()
  isLoaded.value = true
})
</script>

<template>
  <div class="sandbox-container">
    <div id="sandbox"></div>

    <div v-if="isLoaded">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/style/tools';

.sandbox-container {
  @include flex-row();
  gap: 1rem;
  height: clamp(500px, $heightWithoutToolbar, $heightWithoutToolbar);
}

.sandbox-container > div {
  flex-basis: clamp(500px, 50%, 50%);
}

#sandbox {
  @include uniform-size();
}
</style>
