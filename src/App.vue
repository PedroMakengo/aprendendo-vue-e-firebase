<template>
  <div class="app">
    <div v-if="!userVerified">
      <h1>Cadastrar</h1>
      <label for="">E-mail:</label>
      <input type="text" v-model="user.email" /><br />
      <label for="">Senha:</label>
      <input type="password" v-model="user.senha" />
      <br />
      <button @click="entrar">Login</button>
    </div>
    <div v-else>
      <h1>Você está logado</h1>
      <h2>E-mail: {{ user.email }}</h2>
      <button @click="sair">Sair</button>
    </div>

    <hr />

    <form @submit.prevent="cadastrar">
      <h1>Adicionando tarefas</h1>
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
    <h1>Listando tarefas</h1>
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
      user: { email: "", senha: "" },
      userVerified: false,
      posts: [],
    };
  },
  async created() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userVerified = true;
        this.user.email = user.email;
      } else {
        this.userVerified = false;
        this.user.email = "";
      }
    });

    // Trazer todos os posts e usando o olheiro
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
    async cadastrarUsuario() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.senha)
        .then(() => {
          this.user.email = "";
          this.user.senha = "";
        })
        .catch(error => {
          console.log("Error" + error);
          if (error.code === "auth/weak-password") {
            alert("Senha Muito Fraca");
          } else if (error.code === "auth/credencial-already-in-use") {
            alert("E-mail já existe");
          }
        });
    },

    async entrar() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.senha)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
