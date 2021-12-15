<template>
  <div class="user-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.user-container {
  padding: 30px;
  background-color: #fff;
  border: 1px solid #fff8;
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
  max-width: 300px;
}
</style>