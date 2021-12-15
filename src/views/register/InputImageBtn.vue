<template>
  <div>
    <label
      class="file-input"
      :class="{ 'archive-selected': hasArchive }"
      for="input-arq"
      >Select</label
    >
    <input
      id="input-arq"
      type="file"
      @change="sendArchive()"
      accept="image/"
      required
    />
  </div>
</template>

<script>
export default {
  props: {
    hasArchive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    sendArchive() {
      this.$emit("newFile", "null");
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.file-input {
  background-color: rgba(255, 255, 0, 0.6);
  text-align: center;
  font-size: 1.1rem;
  padding: 5px;
  border-radius: 6px;
}

.file-input.archive-selected {
  background-color: rgba(0, 255, 0, 0.6);
}
</style>