<template>
  <div>
    <div class="card-container">
      <Card :data="data" v-for="(data, index) in allData" :key="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import Navbar from '@/components/Navbar.vue'
import { ref, onMounted, computed } from 'vue'
import Card from '@/components/Card.vue'

import jsonData from '../assets/json/congressman'
import { getUserData } from '../api/api-get'
import type { Congressman } from '@/types/congressman'
// export default {
//   name: 'CardView',
//   data() {
//     return {
//       allData: [],
//       resultList: [...jsonData.resultList],
//       enemyList: [...jsonData.enemy],
//     }
//   },
//   methods: {
//     isEnemy(item) {
//       return jsonData.enemy.includes(item.HG_NM)
//     },
//   },
//   components: { Card },
//   async mounted() {
//     this.allData.value = await this.getUserData()
//     this.allData.value = this.allData.value = this.allData.value.sort((a, b) =>
//       a.HG_NM < b.HG_NM ? -1 : 1,
//     )
//     this.allData.value.forEach((data) => {
//       data.imgUrl = this.getThumbImgUrl(data)
//       data.enemy = this.isEnemy(data)
//     })
//     console.log(`onMounted enemyFilter : ${this.enemyFilter.value.length}`)
//   },
//   computed: {
//     enemyFilter() {
//       return this.allData.value.filter((cgrs) => this.enemyList.value.includes(cgrs.HG_NM))
//     },
//   },
// }
const allData = ref<Congressman[]>([])
const resultList = ref([...jsonData.resultList])
const enemyList = ref([...jsonData.enemy])
onMounted(async () => {
  allData.value = await getUserData()
  allData.value = allData.value.sort((a: Congressman, b: Congressman) =>
    a.HG_NM < b.HG_NM ? -1 : 1,
  )
  allData.value.forEach((data: Congressman) => {
    data.imgUrl = getThumbImgUrl(data)
    data.enemy = isEnemy(data)
  })
  console.log(`onMounted enemyFilter : ${enemyFilter.value.length}`)
})

const getThumbImgUrl = (cgrs: { HG_NM: string }) => {
  return (
    resultList.value.find((item: { hgNm: string }) => item.hgNm === cgrs.HG_NM)?.mThumbImgUrl || ''
  )
}

const isEnemy = (item: { HG_NM: string }) => {
  console.log(`${item.HG_NM} is enemy : ${jsonData.enemy.includes(item.HG_NM)}`)
  return jsonData.enemy.includes(item.HG_NM)
}

const enemyFilter = computed(() =>
  allData.value.filter((cgrs: { HG_NM: string }) => enemyList.value.includes(cgrs.HG_NM)),
)
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}
</style>
