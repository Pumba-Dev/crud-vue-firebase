<template>
  <div v-if="show" :class="`alert-${type}`" class="alert">
    <span class="msg-text"> {{ msg }} </span>
  </div>
</template>

<script>
export default {
  name: "NotificationLayout",
  data() {
    return {
      show: false,
      msg: "Insert a message here!",
      type: "danger",
    };
  },
  created() {
    this.$root.$on("NewNotification", (payload) => {
      this.show = true;
      this.type = payload.type;
      this.msg = payload.msg;

      setTimeout(() => {
        this.close();
      }, payload.timeout || 4000);
    });
  },
  methods: {
    close() {
      this.msg = "";
      this.type = "danger";
      this.show = false;
    },
  },
};
</script>

<style scoped>
.alert {
  max-width: 400px;
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1px solid #000;
}

.alert-danger {
  background-color: rgba(255, 100, 0, 0.7);
}

.alert-normal {
  background-color: rgba(0, 225, 255, 0.7);
}

.msg-text {
  color: black;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
}
</style>
