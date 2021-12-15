<template>
  <div class="hyperlink-container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.hyperlink-container {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 5px;
}

.hyperlink-container > a {
  text-decoration: none;
}
</style>