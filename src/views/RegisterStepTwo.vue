<template>
  <div class="register-screen">
    <MedBox>
      <h2 style="text-align: center">Complete Your Profile</h2>
      <form>
        <InputBox :desc="'Name:'">
          <b-form-input
            required
            type="text"
            placeholder="type your name"
            v-model="inputUser.name"
          />
        </InputBox>
        <div style="display: flex; gap: 10px">
          <InputBox :desc="'Task:'">
            <b-form-input
              required
              type="text"
              placeholder="type your ocupation"
              v-model="inputUser.task"
            />
          </InputBox>
          <InputBox :desc="'Age:'">
            <b-form-input
              style="max-width: 70px"
              required
              type="number"
              placeholder="type your age"
              v-model="inputUser.age"
            />
          </InputBox>
        </div>

        <InputBox :desc="'Street:'">
          <b-form-input
            required
            type="text"
            placeholder="Type yout street"
            v-model="inputUser.adress.street"
          />
        </InputBox>
        <div class="cep-city">
          <InputBox :desc="'CEP:'">
            <b-form-input
              required
              type="text"
              placeholder="000000-00"
              v-model="inputUser.adress.cep"
            />
          </InputBox>
          <InputBox :desc="'City:'">
            <b-form-input
              required
              type="text"
              placeholder="City - State"
              v-model="inputUser.adress.city"
            />
          </InputBox>
        </div>
        <div>
          <InputBox :desc="'Who You Are:'">
            <b-form-input
              required
              type="text"
              placeholder="Type about you..."
              v-model="inputUser.whoIAm"
            />
          </InputBox>
        </div>
        <div class="submit-btn">
          <b-button @click.prevent="completeProfile()" variant="primary"
            >Done</b-button
          >
        </div>
      </form>
    </MedBox>
  </div>
</template>

<script>
import { getFirestore, setDoc, doc } from "firebase/firestore";
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
        name: "",
        age: 0,
        adress: {
          street: "",
          cep: "",
          city: "",
          state: "",
        },
        task: "",
        whoIAm: "",
        imgSrc: "",
      },
    };
  },
  methods: {
    reset() {
      this.inputUser = {
        name: "",
        age: 0,
        adress: {
          street: "",
          cep: "",
          city: "",
          state: "",
        },
        task: "",
        whoIAm: "",
        imgSrc: "",
        uid: "",
      };
    },
    async completeProfile() {
      let userData = this.inputUser;
      userData.uid = window.uid;
      console.log(window.uid);
      const db = getFirestore();
      try {
        await setDoc(doc(db, "users", userData.uid), userData);
        this.$router.push({ name: "home" });
      } catch (e) {
        console.error("Error adding document: ", e);
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

.cep-city {
  display: flex;
  gap: 10px;
}
</style>