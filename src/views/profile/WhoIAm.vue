<template>
  <div class="info-who-i-am">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.info-who-i-am > h3 {
  text-align: center;
}

.info-who-i-am > p {
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>