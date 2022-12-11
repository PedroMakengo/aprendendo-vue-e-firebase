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

    <button @click="buscarPosts">Buscar Posts</button>

    <hr />
    <h2>{{ posts.autor }}</h2>
    <h2>{{ posts.tarefa }}</h2>
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
        .add({ tarefa: this.posts.tarefa, autor: this.posts.autor })
        .then(() => {
          console.log("Cadastrado com sucesso");
          this.posts.autor = "";
          this.posts.tarefa = "";
        })
        .catch(error => {
          console.log("Gerou alguém erro" + error);
        });
    },
    async buscarPosts() {
      await firebase
        .firestore()
        .collection("posts")
        .doc("HDJaRW5wBpm5qYajeoXq")
        .get()
        .then(item => {
          this.posts = item.data();
          console.log(item.data().tarefa + item.data().autor);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
