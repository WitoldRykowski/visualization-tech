<script setup lang="ts">
import VariantsListCard from './components/VariantsListCard.vue'
import {
  ALGORITHMS,
  POSSIBLE_TAGS,
  type Tag,
  type Variant,
  type VariantName
} from '@/services/Sandbox/sandbox.service'
import { computed, ref } from 'vue'
import { QCheckbox, QInput } from 'quasar'

const search = ref('')
const tags = ref([])

const compareSearchToVariant = (variant: VariantName) => {
  if (!search.value) return true

  const transformedSearch = search.value.replace(/\s/g, '').toLowerCase()

  return (variant as string).toLowerCase().includes(transformedSearch)
}

const filterByTags = (variant: Variant, tag: Tag) => {
  return variant.tags.includes(tag)
}

const algorithmsList = computed(() => {
  return ALGORITHMS.filter((variant) => {
    const result = !tags.value.length || tags.value.every((tag) => filterByTags(variant, tag))

    return compareSearchToVariant(variant.name) && result
  })
})
</script>

<template>
  <div class="container">
    <div class="search-bar">
      <QInput v-model="search" outlined dense label="Search" />

      <div class="tags">
        <QCheckbox
          v-model="tags"
          v-for="tag in POSSIBLE_TAGS"
          :val="tag"
          :key="tag"
          :tag="tag"
          :label="`#${tag}`"
        />
      </div>
    </div>

    <div class="variants-list">
      <VariantsListCard v-for="algorithm in algorithmsList" :key="algorithm" :variant="algorithm" />
    </div>

    <div v-show="algorithmsList.length === 0" class="empty-list">
      List is empty! Try to search for another algorithm.
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 1rem;
}

.search-bar {
  border-bottom: 1px solid white;
  margin-bottom: 2rem;
}

.variants-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
}

.list-title {
  font-weight: 600;
  font-size: 1.5rem;
}

.empty-list {
  margin-top: 10rem;
  text-align: center;
  font-size: 2rem;
}
</style>
