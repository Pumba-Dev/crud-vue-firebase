<template>
  <div class="profile">
    <UserContainer>
      <UserImg />
      <ProfileName>
        <h3>{{ user.name }}</h3>
        <h6>{{ user.task }}</h6>
        <h6>{{ user.age }} years</h6>
      </ProfileName>
      <b-button class="logout-btn" variant="primary" @click="logout()"
        >Logout</b-button
      >
    </UserContainer>
    <InfoContainer>
      <InfoHeader>
        <h1>Profile</h1>
        <h6><strong>Account E-mail: </strong>{{ user.email }}</h6>
      </InfoHeader>
      <InfoAdress>
        <h3 style="text-align: center">Adress</h3>
        <h6><strong>Street: </strong> {{ user.adress.street }}</h6>
        <h6><strong>Cep: </strong> {{ user.adress.cep }}</h6>
        <h6>
          <strong>City: </strong> {{ user.adress.city }}
          {{ user.adress.state }}
        </h6>
      </InfoAdress>
      <WhoIAm>
        <h3>Who I Am:</h3>
        <p class="who-i-am">{{ user.whoIAm }}</p>
      </WhoIAm>
    </InfoContainer>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserContainer from "./UserContainer.vue";
import InfoContainer from "./InfoContainer.vue";
import UserImg from "./UserImg.vue";
import ProfileName from "./ProfileName.vue";
import InfoHeader from "./InfoHeader.vue";
import InfoAdress from "./InfoAdress.vue";
import WhoIAm from "./WhoIAm.vue";
export default {
  components: {
    UserContainer,
    InfoContainer,
    UserImg,
    ProfileName,
    InfoHeader,
    InfoAdress,
    WhoIAm,
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
    async setCurrentUser() {
      const db = getFirestore();
      const currentUser = getAuth().currentUser;
      const userDocument = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userDocument);

      if (docSnap.exists()) {
        this.user = {
          name: docSnap.data().name,
          age: docSnap.data().age,
          email: currentUser.email,
          adress: {
            street: docSnap.data().adress.street,
            cep: docSnap.data().adress.cep,
            city: docSnap.data().adress.city,
          },
          task: docSnap.data().task,
          whoIAm: docSnap.data().whoIAm,
        };
      } else {
        this.$root.$emit("NewNotification", {
          msg: "Could not read user!",
          type: "danger",
        });
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Router Profile -> Login");
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
.profile {
  display: flex;
  background-color: #fff4;
  border: 1px solid #fff8;
  border-radius: 2em;
}

.logout-btn {
  position: absolute;
  bottom: 25px;
}
</style>