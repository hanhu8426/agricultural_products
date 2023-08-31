<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <div>
    <LayoutHeader />
  </div>
  <div>
    <RouterView />
  </div>
  <div>
    <LayoutFooter />
  </div>
</template>

<style>
LayoutHeader{
 width: 100%;
}
</style>