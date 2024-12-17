<template>
  <div class="card-container">
    <b-icon-arrow-up></b-icon-arrow-up>
    <div
      v-for="(item, index) in gridItems"
      :key="index"
      class="card"
      @click="onClickDetail(item)"
      :class="isEnemy(item) && 'enemy'"
      :style="`background-color:${color[item.POLY_NM]}`"
    >
      <div class="card-image">
        <img :src="`${baseUrl}${getThumbImgUrl(item)}`" :alt="item.HG_NM" />
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
import { ref, onMounted, computed } from 'vue'
import data from '../assets/json/congressman'
import { getUserData } from '../api/api-get'

const baseUrl = 'https://www.assembly.go.kr'
const jsonDataList = ref([...data.resultList])
const gridItems = ref([])

const color = {
  국민의힘: '#ff0000',
  더불어민주당: '#203b83',
  조국혁신당: '#203b83',
  개혁신당: '#ff7921',
  진보당: '#d9081e',
  기본소득당: '#02c1d4',
  무소속: '#ffffff',
}

onMounted(async () => {
  gridItems.value = await getUserData()
  gridItems.value = gridItems.value = gridItems.value.sort((a, b) => (a.HG_NM < b.HG_NM ? -1 : 1))
  console.log(`onMounted enemyFilter : ${enemyFilter.value.length}`)
})
const onClickDetail = (item) => {
  console.log(`onClickDetail ${item.HG_NM}, homepage : ${item.HOMEPAGE}`)
  if (item.HOMEPAGE) {
    console.log('window open')
    window.open(item.HOMEPAGE, '_blank')
  } else {
    alert('No Home page!')
  }
}
const isEnemy = (cgrs) => {
  console.log(`${cgrs.HG_NM} is enemy : ${data.enemy.includes(cgrs.HG_NM)}`)
  return data.enemy.includes(cgrs.HG_NM)
}

const getThumbImgUrl = (cgrs) => {
  return jsonDataList.value.find((item) => item.hgNm === cgrs.HG_NM)?.mThumbImgUrl || ''
}

const enemyFilter = computed(() =>
  gridItems.value.filter((cgrs) => data.enemy.includes(cgrs.HG_NM)),
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
