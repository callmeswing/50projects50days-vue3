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
  {
    path: "/projects/rotating-navigation-animation",
    redirect: "/projects/rotating-navigation-animation/griezmann",
    name: "RotatingNavigationAnimation",
    component: () =>
      import("@views/projects/Day03/RotatingNavigationAnimation.vue"),
    children: [
      {
        path: "/projects/rotating-navigation-animation/griezmann",
        name: "RNA1",
        component: () => import("@views/projects/Day03/pages/Griezmann.vue"),
      },
      {
        path: "/projects/rotating-navigation-animation/sonny",
        name: "RNA2",
        component: () => import("@views/projects/Day03/pages/Sonny.vue"),
      },
      {
        path: "/projects/rotating-navigation-animation/harrykane",
        name: "RNA3",
        component: () => import("@views/projects/Day03/pages/HarryKane.vue"),
      },
    ],
  },
  {
    path: "/projects/hidden-search",
    name: "HiddenSearch",
    component: () => import("@views/projects/Day04/HiddenSearch.vue"),
  },
  // 07
  {
    path: "/projects/split-landing-page",
    name: "SplitLandingPage",
    component: () => import("@views/projects/Day07/SplitLandingPage.vue"),
  },
  // 08
  {
    path: "/projects/form-wave",
    name: "FormWave",
    component: () => import("@views/projects/Day08/FormWave.vue"),
  },
];

export default routes;
