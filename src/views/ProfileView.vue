<template>
  <div class="wrapper">
    <MenuView />
    <div class="content-page">
      <div class="content">
        <div class="container-fluid">
          <FooterView />
        </div>
      </div>
    </div>
  </div>
  <RightSidebarView />
</template>
<script setup>
import MenuView from '@/components/layouts/MenuView.vue'
import FooterView from '@/components/layouts/FooterView.vue'
import RightSidebarView from '@/components/layouts/RightSidebarView.vue'
</script>
