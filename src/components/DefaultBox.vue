<template>
  <div class="default-box">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.default-box {
  background-color: #fff4;
  border: 1px solid #fff8;
  border-radius: 2em;
  padding: 20px;
  width: 25vw;
  min-width: 400px;
}
</style>