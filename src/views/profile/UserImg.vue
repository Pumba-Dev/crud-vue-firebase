<template>
  <img class="user-img" src="@/assets/default-avatar.jpg" alt="Profile Image" />
</template>

<script>
export default {
  props: {
    srcImg: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>
.user-img {
  max-width: 150px;
  border-radius: 50%;
}
</style>