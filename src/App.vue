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
    isRedirectRoute() {
      return (
        this.$router.currentRoute.name == "login" ||
        this.$router.currentRoute.name == "register"
      );
    },
    setCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          window.uid = user.uid;
          if (this.isRedirectRoute()) this.$router.push({ name: "home" });
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
  min-height: 100vh;
  min-width: min-content;
  height: 100%;
  width: 100%;
  background-color: #6dd5fa;
  padding: 20px;
}

.med-logo {
  min-width: 250px;
  width: 20%;
  margin-bottom: 30px;
}
</style>
