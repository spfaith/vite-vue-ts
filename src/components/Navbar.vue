<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="primary">
    <BNavbarBrand href="#">Neran 1203</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItemDropdown :text="viewId" right>
          <BDropdownItem
            v-for="view in props.viewType"
            :replace="true"
            :to="{ name: view.comp }"
            :key="view.id"
            >{{ view.id }}</BDropdownItem
          >
          <!-- <BDropdownItem href="/slide">Slide</BDropdownItem> -->
          <!-- <BDropdownItem href="/card">Card</BDropdownItem> -->
        </BNavItemDropdown>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown text="소속" right>
          <BDropdownItem href="#">더불어민주당</BDropdownItem>
          <BDropdownItem href="#">국민의힘</BDropdownItem>
          <BDropdownItem href="#">조국혁신당</BDropdownItem>
          <BDropdownItem href="#">개혁신당</BDropdownItem>
          <BDropdownItem href="#">진보당</BDropdownItem>
          <BDropdownItem href="#">기본소득당</BDropdownItem>
          <BDropdownItem href="#">무소속</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput class="me-2" placeholder="Search" />
        <BButton type="submit" variant="outline-success">Search</BButton>
      </BNavForm>
    </BCollapse>
  </BNavbar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// const viewType = ['Grid', 'Slide', 'Card']
// const viewId = ref(viewType[0])
const props = defineProps(['viewType'])
const viewId = ref(props.viewType[0].id)
onMounted(() => console.log('[Navbar] onMounted'))
</script>

<style></style>
