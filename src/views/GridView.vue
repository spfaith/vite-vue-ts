<template>
  <div class="card-container">
    <div
      v-for="(item, index) in allData"
      :key="index"
      class="card"
      @click="onClickDetail(item)"
      :class="isEnemy(item) && 'enemy'"
      :style="`background-color:${COLOR[item.POLY_NM]}`"
    >
      <div class="card-image">
        <img :src="`${URL.BASE_URL}${getThumbImgUrl(item)}`" :alt="item.HG_NM" />
      </div>
      <div class="card-name">{{ `${item.HG_NM} (${item.POLY_NM})` }}</div>
      <div class="card-icons">
        <IconInstagram />
        <IconFacebook />
        <IconTwitterX />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import jsonData from '@/assets/json/congressman'
import { ref, onMounted, computed } from 'vue'
import { getUserData } from '@/api/api-get'
import { URL, COLOR } from '@/constants/enum'

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

// type IS_ENEMY = (a: object) => boolean
const isEnemy: boolean = (item: object) => {
  return jsonData.enemy.includes(item.HG_NM)
}

const enemyFilter = computed(() =>
  allData.value.filter((cgrs) => enemyList.value.includes(cgrs.HG_NM)),
)
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  width: 12rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card.enemy {
  border: 3px solid red;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 10rem;
}
.card-image img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #ffff00;
  border-radius: 3px;
}

.card-name {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  background-color: #f8f9fa;
  color: black;
}

.card-icons {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f1f3f5;
}

.card-icon {
  font-size: 1.5rem;
  color: #495057;
  cursor: pointer;
  transition: color 0.3s ease;
}

.card-icon:hover {
  color: #228be6;
}

/* 반응형 미디어 쿼리 */
@media screen and (max-width: 600px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
