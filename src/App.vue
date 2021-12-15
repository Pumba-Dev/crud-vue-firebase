<template>
  <div id="app">
    <img
      class="med-logo"
      src="@/assets/logo-medclub.png"
      alt="Logo do MedClub"
    />
    <NotificationLayout />
    <router-view />
  </div>
</template>

<script>
import NotificationLayout from "@/components/NotificationLayout.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    NotificationLayout,
  },
  created() {
    this.setCurrentUser();
  },
  methods: {
    setCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          window.uid = user.uid;
          if (this.$router.currentRoute.name != "register")
            this.$router.push({ name: "home" });
        } else {
          window.uid = null;
        }
      });
    },
  },
};
</script>


<style>
#app {
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #6dd5fa;
}

.med-logo {
  min-width: 250px;
  width: 20%;
  margin-bottom: 30px;
}
</style>
