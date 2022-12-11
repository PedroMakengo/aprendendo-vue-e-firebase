<template>
  <div class="app">
    <h1>Aprendendo Vuejs + Firebase</h1>

    <form @submit.prevent="cadastrar">
      <label for="">Id:</label>
      <input type="text" v-model="post.idPost" /> <br />

      <label for="">Tarefa:</label>
      <input type="text" v-model="post.tarefa" /> <br />

      <label for="Autor">Autor</label>
      <input type="text" v-model="post.autor" /> <br />

      <input type="submit" value="Cadastrar" />
    </form>

    <button @click="atualizarPost">Atualizar Posts</button>
    <button @click="buscarPosts">Buscar Posts</button>

    <hr />
    <ul>
      <li v-for="(item, index) in posts" :key="index">
        Id: <strong>{{ item.id }}</strong>
        <button @click="deletarPost(item.id)">Deletar Posts</button>
        <br />
        Tarefa: <strong>{{ item.tarefa }}</strong>
        <br />
        Autor:<strong>{{ item.autor }}</strong>
        <br />

        <br />
        <br />
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "@/services/firebaseConnection";

export default {
  name: "App",
  data() {
    return {
      post: {
        idPost: "",
        tarefa: "",
        autor: "",
      },
      posts: [],
    };
  },
  async created() {
    await firebase
      .firestore()
      .collection("posts")
      .onSnapshot(doc => {
        this.posts = [];

        doc.forEach(item => {
          this.posts.push({
            id: item.id,
            tarefa: item.data().tarefa,
            autor: item.data().autor,
          });
        });
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
    async atualizarPost() {
      await firebase
        .firestore()
        .collection("posts")
        .doc(this.post.idPost)
        .update({
          tarefa: this.post.tarefa,
          autor: this.post.autor,
        })
        .then(() => {
          console.log("Atualizado com sucesso");
          this.post.autor = "";
          this.post.tarefa = "";
          this.post.idPost = "";
        });
    },
    async deletarPost(id) {
      await firebase
        .firestore()
        .collection("posts")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Post deletado com sucesso");
        });
    },
  },
};
</script>

<style scoped></style>
