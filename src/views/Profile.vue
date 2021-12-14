<template>
  <div class="profile">
    <div class="profile-container">
      <img class="profile-img" :src="user.imgSrc" alt="Profile Image" />
      <div class="profile-name">
        <h2>{{ user.name }}</h2>
        <h6 style="margin-bottom: 0px">{{ user.task }}</h6>
        <h6>{{ user.age }} years</h6>
      </div>
      <b-button class="logout-btn" variant="primary" @click="logout()"
        >Logout</b-button
      >
    </div>
    <div class="info-container">
      <div style="margin-bottom: 15px">
        <h1 style="text-align: center">Profile</h1>
        <h6 style="text-align: center">
          <strong>Account E-mail: </strong>{{ user.email }}
        </h6>
      </div>
      <div>
        <h3 style="text-align: center">Adress</h3>
        <h6><strong>Street: </strong> {{ user.adress.street }}</h6>
        <h6><strong>Cep: </strong> {{ user.adress.cep }}</h6>
        <h6>
          <strong>City: </strong> {{ user.adress.city }} -
          {{ user.adress.state }}
        </h6>
      </div>
      <div>
        <h3 style="text-align: center">Who I Am:</h3>
        <p class="who-i-am">{{ user.whoIAm }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
export default {
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
  async beforeMount() {
    const db = getFirestore();
    const currentUser = getAuth().currentUser;
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);

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
        imgSrc: "@/assets/default-avatar.jpg",
      };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
  methods: {
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
.profile-container {
  padding: 30px;
  background-color: #fff;
  border: 1px solid #fff8;
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
}

.profile-img {
  max-width: 150px;
  border-radius: 50%;
}

.profile-name {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logout-btn {
  position: absolute;
  bottom: 25px;
}

.info-container {
  padding: 30px;
  max-width: 500px;
  text-align: justify;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.who-i-am {
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>