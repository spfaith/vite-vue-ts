<template>
  <div>
    <Carousel :allData="allData" />
  </div>
</template>

<script setup lang="ts">
// import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'

import jsonData from '../assets/json/congressman'
import { ref, onMounted, computed } from 'vue'
import { getUserData } from '../api/api-get'

const resultList = ref([...jsonData.resultList])
const enemyList = ref([...jsonData.enemy])
const allData = ref([])

onMounted(async () => {
  allData.value = await getUserData()
  allData.value = allData.value = allData.value.sort((a, b) => (a.HG_NM < b.HG_NM ? -1 : 1))
  allData.value.forEach((data) => {
    data.imgUrl = getThumbImgUrl(data)
    data.enemy = isEnemy(data)
  })
  console.log(`onMounted enemyFilter : ${enemyFilter.value.length}`)
})

const getThumbImgUrl = (cgrs) => {
  return resultList.value.find((item) => item.hgNm === cgrs.HG_NM)?.mThumbImgUrl || ''
}

type IS_ENEMY = (a: object) => boolean
const isEnemy: IS_ENEMY = (item) => {
  return jsonData.enemy.includes(item.HG_NM)
}

const enemyFilter = computed(() =>
  allData.value.filter((cgrs) => enemyList.value.includes(cgrs.HG_NM)),
)
</script>

<style></style>
