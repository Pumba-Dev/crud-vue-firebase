<template>
  <div class="info-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.info-container {
  padding: 30px;
  max-width: 500px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>