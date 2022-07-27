<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label
    :for="title"
    class="block text-sm font-medium text-gray-700 capitalize"
    >{{ title }}</label
  >
</template>
