import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";

import Produto from "../pages/Produto/index.vue";
import MeusProdutos from "../pages/Produto/MeusProdutos.vue";
import Editar from "../pages/Produto/Editar.vue";
import Detalhe from "../pages/Produto/Detalhe.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Produto",
    path: "/produto",
    component: Produto,
    children: [
      { path: "", component: MeusProdutos },
      { path: ":id", component: Detalhe, props: true },
      {
        path: ":id/editar",
        component: Editar,
        props: true,
        name: "editar",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Criando um interceptador global
router.beforeEach((to, from, next) => {
  console.log("Chamando antes das rotas");
  next();
});

export default router;
