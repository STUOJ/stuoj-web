<script setup lang="ts">
import {ref} from "vue";
import {type BlogParams} from "@/types/Blog";
import {OrderBy} from "@/types/misc";

const blogParams = ref<BlogParams>({
  page: 1,
  size: 5,
  order_by: OrderBy.create_time,
  order: 'desc',
});
</script>

<template>
  <BlogsComp :select="false" :params="blogParams" />
</template>

<style scoped></style>
