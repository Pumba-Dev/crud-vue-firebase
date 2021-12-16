<template>
  <div>
    <DefaultBox>
      <h1>Update</h1>
      <form>
        <InputContainer :desc="'Name:'">
          <b-form-input
            required
            type="text"
            placeholder="type your name"
            maxlength="30"
            size="30"
            v-model="inputUser.name"
          />
        </InputContainer>
        <ColumnContainer>
          <InputContainer :desc="'Image:'">
            <InputImageBtn :hasArchive="hasArchive" @newFile="processFile()" />
          </InputContainer>
          <InputContainer :desc="'Task:'">
            <b-form-input
              required
              type="text"
              placeholder="type your ocupation"
              maxlength="20"
              size="20"
              v-model="inputUser.task"
            />
          </InputContainer>
          <InputContainer :desc="'Age:'">
            <b-form-input
              style="max-width: 70px"
              required
              type="number"
              placeholder="type your age"
              min="18"
              max="110"
              @blur="fixAge()"
              v-model.number="inputUser.age"
            />
          </InputContainer>
        </ColumnContainer>
        <InputContainer :desc="'Street:'">
          <b-form-input
            required
            type="text"
            placeholder="Type yout street"
            maxlength="37"
            size="37"
            v-model="inputUser.adress.street"
          />
        </InputContainer>
        <div class="cep-city">
          <InputContainer :desc="'CEP:'">
            <b-form-input
              required
              type="text"
              placeholder="00000-000"
              v-mask="'#####-###'"
              v-model="inputUser.adress.cep"
              @blur="processCEP()"
            />
          </InputContainer>
          <InputContainer :desc="'City:'">
            <b-form-input
              required
              type="text"
              placeholder="City - State"
              maxlength="20"
              size="20"
              v-model="inputUser.adress.city"
            />
          </InputContainer>
        </div>
        <div>
          <InputContainer :desc="'Who You Are:'">
            <b-form-input
              required
              type="text"
              placeholder="Type about you..."
              maxlength="180"
              size="180"
              v-model="inputUser.whoIAm"
            />
          </InputContainer>
        </div>
        <div class="submit-btn">
          <b-button @click.prevent="submitUpdate()" variant="primary"
            >Done</b-button
          >
        </div>
      </form>
    </DefaultBox>
  </div>
</template>

<script>
import { consultCEP } from "@/plugins/searchCEP.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DefaultBox from "@/components/DefaultBox.vue";
import InputContainer from "@/components/InputContainer.vue";
import ColumnContainer from "@/components/ColumnContainer.vue";
import InputImageBtn from "@/views/register/InputImageBtn.vue";

export default {
  components: { DefaultBox, InputContainer, ColumnContainer, InputImageBtn },
  data() {
    return {
      inputUser: {
        name: "",
        age: 18,
        adress: {
          street: "",
          cep: "",
          city: "",
        },
        task: "",
        whoIAm: "",
      },
      hasArchive: false,
    };
  },
  beforeMount() {
    this.setCurrentUser();
  },
  methods: {
    processFile() {
      this.hasArchive = true;
    },
    fixAge() {
      if (this.inputUser.age < 18) this.inputUser.age = 18;
      if (this.inputUser.age > 110) this.inputUser.age = 110;
    },
    async processCEP() {
      try {
        const dataCEP = await consultCEP(this.inputUser.adress.cep);
        if (dataCEP.data.uf != undefined) {
          this.inputUser.adress.street =
            dataCEP.data.logradouro + " " + dataCEP.data.complemento;
          this.inputUser.adress.city =
            dataCEP.data.localidade + " - " + dataCEP.data.uf;
        }
      } catch (error) {
        this.throwError(error);
      }
    },
    sendNotify(msg, type) {
      this.$root.$emit("NewNotification", {
        msg: msg,
        type: type,
      });
    },
    setCurrentUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          Window.uid = user.uid;
          this.setUserProfile();
        } else {
          this.sendNotify("Canot Read User.", "Danger");
        }
      });
    },
    async setUserProfile() {
      const db = getFirestore();
      const userID = Window.uid;
      const collection = "users";
      const docRef = doc(db, collection, userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.inputUser = { ...docSnap.data() };
      } else {
        this.sendNotify("Document not exist", "danger");
      }
    },
    async submitUpdate() {
      const db = getFirestore();
      const userID = Window.uid;
      const collection = "users";
      const newData = this.inputUser;
      const UserRef = doc(db, collection, userID);
      console.log(UserRef);
      await updateDoc(UserRef, {
        name: newData.name,
        age: newData.age,
        adress: {
          street: newData.adress.street,
          cep: newData.adress.cep,
          city: newData.adress.city,
        },
        task: newData.task,
        whoIAm: newData.whoIAm,
      }).then(() => {
        this.sendNotify("Profile Updated.", "normal");
        this.$router.push({ name: "home" });
      });
    },
  },
};
</script>

<style>
</style>