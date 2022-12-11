<template>
  <div class="app">
    <h1>Aprendendo Vuejs + Firebase</h1>

    <form @submit.prevent="cadastrar">
      <label for="">Tarefa:</label>
      <input type="text" v-model="post.tarefa" /> <br />

      <label for="Autor">Autor</label>
      <input type="text" v-model="post.autor" /> <br />

      <input type="submit" value="Cadastrar" />
    </form>

    <button @click="buscarPosts">Buscar Posts</button>

    <hr />
    <div>
      <div v-for="(item, index) in posts" :key="index">
        <span
          >Tarefa: <strong>{{ item.tarefa }}</strong></span
        >
        <p>
          Autor: <strong>{{ item.autor }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/services/firebaseConnection";

export default {
  name: "App",
  data() {
    return {
      post: {
        tarefa: "",
        autor: "",
      },
      posts: [],
    };
  },
  async created() {
    this.posts = [];
    await firebase
      .firestore()
      .collection("posts")
      .get()
      .then(item => {
        item.forEach(doc => {
          this.posts.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            autor: doc.data().autor,
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async cadastrar() {
      await firebase
        .firestore()
        .collection("posts")
        .add({ tarefa: this.post.tarefa, autor: this.post.autor })
        .then(() => {
          console.log("Cadastrado com sucesso");
          this.post.autor = "";
          this.post.tarefa = "";
        })
        .catch(error => {
          console.log("Gerou alguém erro" + error);
        });
    },
    async buscarPosts() {
      this.posts = [];
      // await firebase
      //   .firestore()
      //   .collection("posts")
      //   .doc("HDJaRW5wBpm5qYajeoXq")
      //   .get()
      //   .then(item => {
      //     this.posts = item.data();
      //     console.log(item.data().tarefa + item.data().autor);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      // Buscar todos os posts
      await firebase
        .firestore()
        .collection("posts")
        .get()
        .then(item => {
          item.forEach(doc => {
            this.posts.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              autor: doc.data().autor,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
