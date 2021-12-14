<template>
  <div class="login-screen">
    <MedBox>
      <h1 style="text-align: center">Login</h1>
      <form>
        <InputBox :desc="'E-mail:'">
          <b-form-input
            required
            type="text"
            placeholder="type your e-mail"
            v-model="inputUser.email"
          />
        </InputBox>
        <InputBox :desc="'Password:'">
          <b-form-input
            required
            type="password"
            placeholder="type your e-mail"
            v-model="inputUser.password"
            @keydown.enter="login()"
          />
        </InputBox>
        <div class="register-link">
          <router-link class="register-link-btn" to="/register"
            >don't have a registration?</router-link
          >
        </div>
        <div class="submit-btn">
          <div>
            <input
              type="checkbox"
              style="margin-right: 10px"
              v-model="rememberMail"
            />
            <span>Remember E-mail?</span>
          </div>
          <b-button @click.prevent="login()" variant="primary"
            >Sign In</b-button
          >
        </div>
      </form>
    </MedBox>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import MedBox from "@/components/MedBox.vue";
import InputBox from "@/components/InputBox.vue";

export default {
  name: "Home",
  components: {
    MedBox,
    InputBox,
  },
  data() {
    return {
      inputUser: {
        email: "",
        password: "",
      },
      rememberMail: false,
    };
  },
  methods: {
    resetAttr() {
      this.getCacheEmail();
      this.inputUser.password = "";
    },
    getCacheEmail() {
      const savedEmail = localStorage.getItem("savedEmail");
      this.inputUser.email = savedEmail.toString();
    },
    pushCacheEmail() {
      localStorage.setItem("savedEmail", this.inputUser.email);
    },
    async login() {
      if (this.rememberMail) this.pushCacheEmail();
      const currentUser = this.inputUser;
      try {
        const auth = getAuth();
        const resp = await signInWithEmailAndPassword(
          auth,
          currentUser.email,
          currentUser.password
        );
        window.uid = resp.user.uid;
        this.$router.push({ name: "home" });
        // console.log(resp.user.uid);
      } catch (error) {
        let msg = "";
        switch (error.code) {
          case "auth/user-not-found":
            msg = "User not found!";
            break;
          case "auth/wrong-password":
            msg = "Invalid Password!";
            break;
          default:
            msg = "Could not login, please try again.";
        }
        this.$root.$emit("NewNotification", {
          msg,
          type: "danger",
        });
      }
      this.resetAttr();
    },
  },
};
</script>

<style scoped>
.login-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-link {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
}

.register-link-btn {
  text-decoration: none;
}

.submit-btn {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
</style>