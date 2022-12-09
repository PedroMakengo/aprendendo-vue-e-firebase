<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="editar-produto">
    <h2>Editando produto</h2>
    <span
      >Código do Produto: <strong>{{ id }}</strong>
    </span>
    <br />
    <span>Nome do produto: {{ $route.query.name }}</span>
    <br />
    <span>Quantidade disponível: {{ $route.query.qtd }}</span>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style scoped></style>
