<template>
  <div class="register-step-one-view">
    <DefaultBox>
      <h1>Register</h1>
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
            placeholder="type your password"
            v-model="inputUser.password"
          />
        </InputContainer>
        <InputContainer :desc="'Confirm Password:'">
          <b-form-input
            required
            type="password"
            placeholder="confirm your password"
            v-model="inputUser.password_confirm"
          />
        </InputContainer>
        <HyperLinkContainer>
          <router-link to="/Login">Already have a registration?</router-link>
        </HyperLinkContainer>
        <SubmitContainerLeft>
          <b-button @click.prevent="signUp()" variant="primary">
            Sign Up
          </b-button>
        </SubmitContainerLeft>
      </form>
    </DefaultBox>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DefaultBox from "@/components/DefaultBox.vue";
import InputContainer from "@/components/InputContainer.vue";
import HyperLinkContainer from "@/components/HyperLinkContainer.vue";
import SubmitContainerLeft from "./SubmitContainerLeft.vue";

export default {
  components: {
    DefaultBox,
    InputContainer,
    HyperLinkContainer,
    SubmitContainerLeft,
  },
  data() {
    return {
      inputUser: {
        email: "",
        password: "",
        password_confirm: "",
      },
    };
  },
  methods: {
    reset() {
      this.inputUser = {
        password: "",
        password_confirm: "",
      };
    },
    checkPassword() {
      return this.inputUser.password == this.inputUser.password_confirm;
    },
    throwError(error) {
      let msg = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "This e-mail already in use.";
          this.email = ""; // Limpa o input de E-mail
          break;
        case "auth/wrong-password":
          msg = "Invalid Password.";
          break;
        case "auth/invalid-email":
          msg = "Invalid E-mail.";
          break;
        case "auth/internal-error":
          msg = "Type a password.";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters.";
          break;
        default:
          msg = error.message;
      }
      this.$root.$emit("NewNotification", {
        msg,
        type: "danger",
      });
    },
    signUp() {
      if (this.checkPassword()) {
        const email = this.inputUser.email;
        const password = this.inputUser.password;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            this.$router.push({ name: "register2" });
          })
          .catch((error) => {
            this.throwError(error);
          });
      } else {
        this.$root.$emit("NewNotification", {
          msg: "Passwords do not match!",
          type: "danger",
        });
        this.reset();
      }
    },
  },
};
</script>

<style>
.register-step-one-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>