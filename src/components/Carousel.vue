<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BCarousel
    fade
    controls
    :interval="interval"
    ride="carousel"
    background="black"
    label-next=""
    label-prev=""
    :img-height="imgHeight"
  >
    <BCarouselSlide v-for="(data, index) in props.allData.slice(0, 10)" :key="`slide-${index}`">
      <template #img>
        <BImg
          placement="center"
          :lazy="true"
          :src="`${URL.BASE_URL}${data.imgUrl}`"
          :height="imgHeight"
          alt="image slot"
        />
      </template>
      <h5>
        {{ data.HG_NM }}
      </h5>
      <BIconInstagram
        v-if="data.HOMEPAGE?.includes('instagram')"
        @click="goInstaGram(data)"
      ></BIconInstagram>
      <BIconFacebook
        v-if="data.HOMEPAGE?.includes('facebook')"
        @click="goFacebook(data)"
      ></BIconFacebook>
      <BIconTwitter
        v-if="data.HOMEPAGE?.includes('twitter')"
        @click="goTwitter(data)"
      ></BIconTwitter>
      <BIconHouse v-if="data.HOMEPAGE?.includes('blog')" @click="goHomePage(data)"> </BIconHouse>
    </BCarouselSlide>
  </BCarousel>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, type PropType } from 'vue'
import { URL } from '@/constants/enum'
import * as bootstrap from 'bootstrap'
import {
  BCarousel,
  BCarouselSlide,
  BIconInstagram,
  BIconFacebook,
  BIconTwitter,
  BIconHouse,
} from 'bootstrap-vue'

const imgHeight = ref(480)
const interval = ref(10000)
const props = defineProps({
  allData: {
    type: Array as PropType<object[]>,
    required: true,
  },
})
// Optional: Initialize carousel programmatically
onMounted(() => {
  // const carouselElement = document.querySelector('#imageCarousel')
  // if (carouselElement) {
  //   new bootstrap.Carousel(carouselElement, {
  //     interval: 30000, // Auto-change every 3 seconds
  //     ride: true,
  //   })
  // }
})
const goInstaGram = (data: { HOMEPAGE: string | globalThis.URL | undefined }) => {
  window.open(data.HOMEPAGE, '_blank')
}
const goFacebook = (data: { HOMEPAGE: string | globalThis.URL | undefined }) => {
  window.open(data.HOMEPAGE, '_blank')
}
const goTwitter = (data: { HOMEPAGE: string | globalThis.URL | undefined }) => {
  window.open(data.HOMEPAGE, '_blank')
}
const goHomePage = (data: { HOMEPAGE: string | globalThis.URL | undefined }) => {
  window.open(data.HOMEPAGE, '_blank')
}
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
