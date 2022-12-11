<template>
  <div class="app">
    <div>
      <h1>Cadastrar</h1>
      <label for="">Nome:</label>
      <input type="text" v-model="user.nome" /><br />
      <label for="">E-mail:</label>
      <input type="text" v-model="user.email" /><br />
      <label for="">Senha:</label>
      <input type="password" v-model="user.senha" /> <br />
      <label for="">Tipo usuário:</label>
      <select name="" v-model="user.type">
        <option value="Normal">Normal</option>
        <option value="Admin">Admin</option>
      </select>
      <br />
      <button @click="cadastrarUsuario">Cadastrar</button>
    </div>
  </div>
</template>

<script>
import firebase from "@/services/firebaseConnection";

export default {
  name: "App",
  data() {
    return {
      user: { email: "", senha: "", nome: "", type: "" },
    };
  },

  methods: {
    async cadastrarUsuario() {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.senha);

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          nome: this.user.nome,
          type: this.user.type,
        })
        .then(() => {
          this.user.nome = "";
          this.user.email = "";
          this.user.senha = "";
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
