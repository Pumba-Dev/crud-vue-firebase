<template>
  <div class="register-step-one-view">
    <DefaultBox>
      <h1 style="text-align: center">Register</h1>
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
            @keydown.enter="singUp()"
          />
        </InputContainer>
        <div class="link">
          <router-link class="link-btn" to="/Login"
            >Already have a registration?
          </router-link>
        </div>
        <div class="submit-btn">
          <b-button @click.prevent="signUp()" variant="primary"
            >Sign Up</b-button
          >
        </div>
      </form>
    </DefaultBox>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import DefaultBox from "@/components/DefaultBox.vue";
import InputContainer from "@/components/InputContainer.vue";
export default {
  name: "Register",
  components: {
    DefaultBox,
    InputContainer,
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
    signUp() {
      if (this.checkPassword()) {
        const email = this.inputUser.email;
        const password = this.inputUser.password;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            console.log("router Register -> Register2");
            this.$router.push({ name: "register2" });
          })
          .catch((error) => {
            let msg = "";
            switch (error.code) {
              case "auth/email-already-in-use":
                msg = "O endereço de e-mail já está em uso por outra conta.";
                this.email = ""; // Limpa o input de E-mail
                break;
              case "auth/wrong-password":
                msg = "Senha inválida";
                break;
              default:
                msg = "Não foi possível criar a conta, tente novamente";
            }
            this.$root.$emit("NewNotification", {
              msg,
              type: "danger",
            });
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

.link {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
}

.link-btn {
  text-decoration: none;
}

.submit-btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
}
</style>