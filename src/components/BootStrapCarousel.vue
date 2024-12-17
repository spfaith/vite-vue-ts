<template>
  <div class="container mt-5">
    <div id="imageCarousel" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators with Icons -->
      <!-- <div class="carousel-indicators">
        <button
          v-for="(slide, index) in allDataList"
          :key="`indicator-${index}`"
          type="button"
          :data-bs-target="'#imageCarousel'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0"
          :aria-label="`Slide ${index + 1}`"
        >
          <i class="bi bi-collection text-info"></i>
        </button>
      </div> -->

      <!-- Carousel Items -->
      <div class="carousel-inner">
        <div
          v-for="(item, index) in allDataList"
          :key="`slide-${index}`"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <img :src="`${baseUrl}${getThumbImgUrl(item)}`" class="d-block w-100" :alt="item.HG_NM" />
          <div class="carousel-caption d-none d-md-block">
            <h5>
              <i class="bi bi-motherboard text-success me-2"></i>
              {{ item.HG_NM }}
            </h5>
            <p>
              <i class="bi bi-motherboard text-waring me-2"></i>
              {{ item.POLY_NM }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Controls with Icons -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="prev"
      >
        <i class="bi bi-chevron-left carousel-control-prev-icon" aria-hidden="true"></i>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="next"
      >
        <i class="bi bi-chevron-right carousel-control-next-icon" aria-hidden="true"></i>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import * as bootstrap from 'bootstrap'
import data from '@/assets/json/congressman'
import { getUserData } from '@/api/api-get'
import { COLOR } from '@/constants/enum'

const baseUrl = 'https://www.assembly.go.kr'
const jsonDataList = ref([...data.resultList])
const allDataList = ref([])

// Interface for Slide with Icons
interface Slide {
  imageUrl: string
  title: string
  description: string
  titleIcon: string
  descriptionIcon: string
  indicatorIcon: string
}

// // Carousel Slides Data with Bootstrap Icons
// const slides = ref<Slide[]>([
//   {
//     imageUrl:
//       'https://www.assembly.go.kr/static/portal/img/openassm/new/thumb/70f21f66d1ea471192858adb6f379299.png',
//     title: 'Technology Innovations',
//     description: 'Exploring cutting-edge technological advancements',
//     titleIcon: 'bi bi-cpu text-primary',
//     descriptionIcon: 'bi bi-motherboard text-success',
//     indicatorIcon: 'bi bi-collection text-info',
//   },
//   {
//     imageUrl: '/api/placeholder/1200/600?text=Nature',
//     title: 'Natural Wonders',
//     description: 'Discovering the beauty of our planet',
//     titleIcon: 'bi bi-tree text-success',
//     descriptionIcon: 'bi bi-globe text-warning',
//     indicatorIcon: 'bi bi-flower1 text-danger',
//   },
//   {
//     imageUrl: '/api/placeholder/1200/600?text=Space',
//     title: 'Space Exploration',
//     description: 'Journeying beyond our world',
//     titleIcon: 'bi bi-rocket text-dark',
//     descriptionIcon: 'bi bi-moon-stars text-primary',
//     indicatorIcon: 'bi bi-stars text-warning',
//   },
// ])

// Optional: Initialize carousel programmatically
onMounted(async () => {
  allDataList.value = await getUserData()
  allDataList.value = allDataList.value.sort((a, b) => (a.HG_NM < b.HG_NM ? -1 : 1))
  console.log(`onMounted enemyFilter : ${enemyFilter.value.length}`)
  const carouselElement = document.querySelector('#imageCarousel')
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 30000, // Auto-change every 3 seconds
      ride: true,
    })
  }
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
const isEnemy = (item) => {
  console.log(`${item.HG_NM} is enemy : ${data.enemy.includes(item.HG_NM)}`)
  return data.enemy.includes(item.HG_NM)
}

const getThumbImgUrl = (item) => {
  const url = jsonDataList.value.find((data) => data.hgNm === item.HG_NM)?.mThumbImgUrl || ''
  console.log(`getThumbImgUrl item.HG_NM : ${item.HG_NM} url : ${url}`)
  return jsonDataList.value.find((data) => data.hgNm === item.HG_NM)?.mThumbImgUrl || ''
}

const enemyFilter = computed(() =>
  allDataList.value.filter((item) => data.enemy.includes(item.HG_NM)),
)
</script>

<style scoped>
.carousel-item img {
  max-height: 15rem;
  object-fit: contain;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}

.carousel-indicators button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  font-size: 2rem;
  color: blue;
}
</style>
