<template>
  <div class="login-screen">
    <DefaultBox>
      <h1 style="text-align: center">Login</h1>
      <form>
        <InputContainer :desc="'E-mail:'">
          <b-form-input
            required
            type="text"
            placeholder="type your e-mail"
            v-model="inputUser.email"
          />
        </InputContainer>
        <InputContainer :desc="'Password:'">
          <b-form-input
            required
            type="password"
            placeholder="type your e-mail"
            v-model="inputUser.password"
            @keydown.enter="login()"
          />
        </InputContainer>
        <HyperLinkContainer>
          <router-link to="/register">don't have a registration?</router-link>
        </HyperLinkContainer>
        <SubmitContainer>
          <RememberMail>
            <input type="checkbox" v-model="rememberMail" />
            <span>Remember E-mail?</span>
          </RememberMail>
          <b-button @click.prevent="login()" variant="primary">
            Sign In
          </b-button>
        </SubmitContainer>
      </form>
    </DefaultBox>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import DefaultBox from "@/components/DefaultBox.vue";
import InputContainer from "@/components/InputContainer.vue";
import HyperLinkContainer from "@/components/HyperLinkContainer.vue";
import SubmitContainer from "./SubmitContainer.vue";
import RememberMail from "./RememberMail.vue";

export default {
  name: "Home",
  components: {
    SubmitContainer,
    RememberMail,
    DefaultBox,
    InputContainer,
    HyperLinkContainer,
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
    async authWithFireBase() {
      const currentUser = this.inputUser;
      try {
        const auth = getAuth();
        const resp = await signInWithEmailAndPassword(
          auth,
          currentUser.email,
          currentUser.password
        );
        window.uid = resp.user.uid;
        console.log("Router Login -> Home");
        this.$router.push({ name: "home" });
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
    },
    login() {
      if (this.rememberMail) this.pushCacheEmail();
      this.authWithFireBase();
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
</style>