<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="grid grid-cols-12 item-start">
    <sidebar />
    <div class="col-span-8 p-12">
      <slot />
    </div>
    <Toaster />
  </div>
</template>