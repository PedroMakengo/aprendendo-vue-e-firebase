<template>
  <div class="app">
    <h1>Aprendendo Vuejs + Firebase</h1>

    <form @submit.prevent="cadastrar">
      <label for="">Tarefa:</label>
      <input type="text" v-model="posts.tarefa" /> <br />

      <label for="Autor">Autor</label>
      <input type="text" v-model="posts.autor" /> <br />

      <input type="submit" value="Cadastrar" />
    </form>
  </div>
</template>

<script>
import firebase from "@/services/firebaseConnection";

export default {
  name: "App",
  data() {
    return {
      posts: {
        tarefa: "",
        autor: "",
      },
    };
  },
  methods: {
    async cadastrar() {
      await firebase
        .firestore()
        .collection("posts")
        .doc("123")
        .set({ tarefa: this.posts.tarefa, autor: this.posts.autor })
        .then(() => {
          console.log("Cadastrado com sucesso");
        })
        .catch(error => {
          console.log("Gerou alguém erro" + error);
        });
    },
  },
};
</script>

<style scoped></style>
