<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div class="footer">
    <div class="about">
      Copyright © 2024-{{ year }} JFOJ. All Rights Reserved.<br/>
      GNU GENERAL PUBLIC LICENSE Version 3<br/>
    </div>
  </div>
</template>

<style scoped>
.footer {
  justify-content: center;
  width: 100%;
}

.about {
  font-size: 12px;
  color: #aaa;
  text-align: center;
}
</style>
