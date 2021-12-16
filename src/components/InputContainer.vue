<template>
  <div class="input-container">
    <span class="desc">{{ desc }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.desc {
  font-size: 1.2rem;
}
.input-container {
  display: flex;
  flex-direction: column;
  margin: 5px;
  font-weight: 400;
}
</style>