<template>
  <div class="profile-view">
    <UserContainer>
      <UserImg />
      <ProfileName>
        <h3>{{ user.name }}</h3>
        <h6>{{ user.task }}</h6>
        <h6>{{ user.age }} years</h6>
      </ProfileName>
      <ProfileMenu>
        <b-button variant="danger" @click="deleteProfile()">
          Delete Profile
        </b-button>
        <b-button variant="primary" @click="logout()"> Logout </b-button>
      </ProfileMenu>
    </UserContainer>
    <InfoContainer>
      <InfoHeader>
        <h1>Profile</h1>
        <h6><strong>Account E-mail: </strong>{{ user.email }}</h6>
      </InfoHeader>
      <InfoAdress>
        <h3>Adress</h3>
        <h6><strong>Street: </strong> {{ user.adress.street }}</h6>
        <h6><strong>Cep: </strong> {{ user.adress.cep }}</h6>
        <h6><strong>City: </strong> {{ user.adress.city }}</h6>
      </InfoAdress>
      <WhoIAm>
        <h3>Who I Am:</h3>
        <p>{{ user.whoIAm }}</p>
      </WhoIAm>
    </InfoContainer>
  </div>
</template>

<script>
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserContainer from "./UserContainer.vue";
import InfoContainer from "./InfoContainer.vue";
import UserImg from "./UserImg.vue";
import ProfileName from "./ProfileName.vue";
import InfoHeader from "./InfoHeader.vue";
import InfoAdress from "./InfoAdress.vue";
import WhoIAm from "./WhoIAm.vue";
import ProfileMenu from "./ProfileMenu.vue";
export default {
  components: {
    UserContainer,
    InfoContainer,
    UserImg,
    ProfileName,
    InfoHeader,
    InfoAdress,
    WhoIAm,
    ProfileMenu,
  },
  data() {
    return {
      user: {
        name: "",
        age: 0,
        email: "",
        adress: {
          street: "",
          cep: "",
          city: "",
        },
        task: "",
        whoIAm: "",
        imgSrc: "",
      },
    };
  },
  beforeMount() {
    this.setCurrentUser();
  },
  methods: {
    sendNotify(msg) {
      this.$root.$emit("NewNotification", {
        msg: msg,
        type: "danger",
      });
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
    async setCurrentUser() {
      const db = getFirestore();
      const currentUser = getAuth().currentUser;
      const userDocument = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userDocument);

      if (docSnap.exists()) {
        this.user = { ...docSnap.data() };
        this.user.email = currentUser.email;
      } else {
        console.log("Tentando fazer login");
        this.$root.$emit("NewNotification", {
          msg: "Could not read user!",
          type: "danger",
        });
      }
    },
    deleteProfile() {
      const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user)
        .then(() => {
          this.sendNotify("User Deleted");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          this.throwError(error.code);
        });
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.sendNotify("Logout");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$root.$emit("NewNotification", {
            msg: "Error in Loggout!",
            type: "danger",
          });
        });
    },
  },
};
</script>

<style scoped>
.profile-view {
  display: flex;
  background-color: #fff4;
  border: 1px solid #fff8;
  border-radius: 2em;
}
</style>