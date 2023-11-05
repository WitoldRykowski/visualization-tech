<script setup lang="ts">
import { QChip } from 'quasar'
import type { Tag } from '@/services/Sandbox/sandbox.service'

defineProps<{
  tag: Tag
}>()
</script>

<template>
  <QChip dense class="tag" :label="`#${tag}`" />
</template>

<style scoped lang="scss">
.tag {
  background: $primary;
  color: white;
}
</style>
