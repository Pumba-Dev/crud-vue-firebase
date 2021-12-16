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
        <b-button variant="danger" @click="deleteProfile()"> Delete </b-button>
        <b-button variant="warning" @click="updateProfile()"> Update </b-button>
        <b-button variant="primary" @click="logoutProfile()"> Logout </b-button>
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
      },
    };
  },
  beforeMount() {
    this.setCurrentUser();
  },
  methods: {
    sendNotify(msg, type) {
      this.$root.$emit("NewNotification", {
        msg: msg,
        type: type,
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
      }
    },
    deleteProfile() {
      const auth = getAuth();
      const user = auth.currentUser;

      deleteUser(user).then(() => {
        this.sendNotify("User Deleted", "normal");
        this.$router.push({ name: "login" });
      });
    },
    updateProfile() {
      this.$router.push({ name: "update" });
    },
    logoutProfile() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.sendNotify("Logout", "normal");
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

@media (max-width: 800px) {
  .profile-view {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    word-wrap: break-word;
  }

  .user-container {
    width: 100%;
    max-width: 100%;
  }

  .info-container {
    justify-content: center;
  }
}
</style>