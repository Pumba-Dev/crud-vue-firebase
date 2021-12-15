<template>
  <div class="profile-name">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
.profile-name {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-name > h3 {
  text-align: center;
  max-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>