<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="produto">
    <h2>Tela Produto</h2>
    <span>Código do Produto</span>
    <br />
    <div class="content-view">
      <router-view />
    </div>
    <button @click="irHome">Ir para home</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Produto",
  methods: {
    irHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
