<template>
  <div class="login-view">
    <DefaultBox>
      <h1>Login</h1>
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
    throwError(error) {
      let msg = "";
      switch (error.code) {
        case "auth/user-not-found":
          msg = "User not found!";
          break;
        case "auth/wrong-password":
          msg = "Invalid Password!";
          break;
        case "auth/invalid-email":
          msg = "Invalid Email!";
          break;
        case "auth/internal-error":
          msg = "Type a password.";
          break;
        default:
          msg = "Internal Error";
      }
      this.$root.$emit("NewNotification", {
        msg,
        type: "danger",
      });
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
        this.$router.push({ name: "home" });
      } catch (error) {
        this.throwError(error);
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
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>