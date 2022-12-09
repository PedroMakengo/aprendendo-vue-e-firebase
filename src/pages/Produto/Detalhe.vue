<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="detalhe-produto">
    <h2>Detalhe do produto</h2>
    <span
      >Código do Produto: <strong>{{ id }}</strong>
    </span>
    <br />
    <!-- <router-link :to="`/produto/${id}/editar`"
      >Editar produto {{ id }}</router-link
    > -->

    <!-- Pegando os dados por meio de paramtros -->
    <router-link
      :to="{
        name: 'editar',
        params: { id },
        query: { name: 'Sujeito Programador', qtd: 12 },
      }"
    >
      Editar produto {{ id }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style scoped></style>
