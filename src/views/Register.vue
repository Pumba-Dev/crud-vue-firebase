<template>
  <div class="register-screen">
    <MedBox>
      <h1 style="text-align: center">Register</h1>
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
            placeholder="type your password"
            v-model="inputUser.password"
          />
        </InputBox>
        <InputBox :desc="'Confirm Password:'">
          <b-form-input
            required
            type="password"
            placeholder="confirm your password"
            v-model="inputUser.password_confirm"
          />
        </InputBox>
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
    </MedBox>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import MedBox from "@/components/MedBox.vue";
import InputBox from "@/components/InputBox.vue";
export default {
  name: "Register",
  components: {
    MedBox,
    InputBox,
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
.register-screen {
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