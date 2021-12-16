<template>
  <div class="info-adress">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.info-adress {
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-adress > h3 {
  text-align: center;
}

.info-adress > h6 {
  flex-wrap: wrap;
}
</style>