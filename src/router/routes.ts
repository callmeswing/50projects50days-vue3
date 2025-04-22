import type { RouteRecordRaw } from "vue-router";
import Home from "@views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  {
    path: "/projects/expanding-cards",
    name: "ExpandingCards",
    component: () => import("@views/projects/Day01/ExpandangCards.vue"),
  },
  {
    path: "/projects/progress-steps",
    name: "ProgressSteps",
    component: () => import("@views/projects/Day02/ProgressSteps.vue"),
  },
];

export default routes;
