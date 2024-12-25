<script setup lang="ts">
import { ref } from 'vue'
import {
  RouterView,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router'
import CardView from './views/CardView.vue'
import SlideView from './views/SlideView.vue'
import GridView from './views/GridView.vue'
import router from './router'

const viewType = ref([
  { id: 'Grid', link: '/grid', comp: 'grid' },
  { id: 'Slide', link: '/slide', comp: 'slide' },
  { id: 'Card', link: '/card', comp: 'card' },
])
const onSelect = (view: {
  link: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}) => {
  console.log(`onSelect view : ${view}`)
  router.replace(view.link)
}
</script>

<template>
  <Navbar :viewType="viewType" @onSelect="onSelect" />
  <RouterView />
</template>

<style scoped></style>
