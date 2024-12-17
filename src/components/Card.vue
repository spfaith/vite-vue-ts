<template>
  <BCard
    class="card"
    no-body
    style="max-width: 20rem"
    :img-src="`${URL.BASE_URL}${props.data.imgUrl}`"
    img-alt="props.data.HG_NM"
    img-top
  >
    <BCardHeader v-if="props.data.enemy" style="background-color: red"
      >탄핵 투표 미참여</BCardHeader
    >
    <BCardBody>
      <BCardTitle>{{ props.data.HG_NM }}</BCardTitle>
      <BCardSubtitle class="mb-2">{{ props.data.POLY_NM }}</BCardSubtitle>
      <BCardText>{{ props.data.ORIG_NM }} </BCardText>
    </BCardBody>
    <BListGroup flush>
      <BListGroupItem>{{ props.data.TEL_NO }}</BListGroupItem>
      <BListGroupItem>{{ props.data.UNITS }}</BListGroupItem>
    </BListGroup>
    <BCardBody v-if="props.data.HOMEPAGE">
      <BIconInstagram
        v-if="data.HOMEPAGE.includes('instagram')"
        @click="goInstaGram(props.data)"
      ></BIconInstagram>
      <BIconFacebook
        v-if="data.HOMEPAGE.includes('facebook')"
        @click="goFacebook(props.data)"
      ></BIconFacebook>
      <BIconTwitter
        v-if="data.HOMEPAGE.includes('twitter')"
        @click="goTwitter(props.data)"
      ></BIconTwitter>
      <BIconHouse v-if="data.HOMEPAGE.includes('blog')" @click="goHomePage(props.data)">
      </BIconHouse>
    </BCardBody>
    <!-- <BCardFooter></BCardFooter> -->
  </BCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { URL } from '@/constants/enum'
import { BCardHeader } from 'bootstrap-vue-next'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const goInstaGram = () => {
  window.open(props.data.HOMEPAGE, '_blank')
}
const goFacebook = () => {
  window.open(props.data.HOMEPAGE, '_blank')
}
const goTwitter = () => {
  window.open(props.data.HOMEPAGE, '_blank')
}
const goHomePage = () => {
  window.open(props.data.HOMEPAGE, '_blank')
}
</script>

<style>
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

/* .card.enemy {
  border: 3px solid red;
} */

.card:hover {
  transform: scale(1.05);
}
</style>
