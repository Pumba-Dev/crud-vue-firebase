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
    console.log(window.uid);
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

@media (max-width: 800px) {
  #app {
    min-height: 100%;
    min-width: 100%;
  }
}
</style>
