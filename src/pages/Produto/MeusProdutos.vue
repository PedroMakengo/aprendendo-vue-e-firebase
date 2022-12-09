<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="meus-produtos" class="produto">
    <ul>
      <router-link to="/produto/10">Adesivo</router-link>
      <router-link to="/produto/35">Camisa Sujeito Programador</router-link>
      <router-link to="/produto/15">MousePad</router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
}
</style>
