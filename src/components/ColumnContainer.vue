<template>
  <div class="column-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.column-container {
  display: flex;
  justify-content: space-between;
}
</style>