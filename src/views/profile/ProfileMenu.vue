<template>
  <div class="profile-menu">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.profile-menu {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>