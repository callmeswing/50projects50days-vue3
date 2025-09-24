import type { RouteRecordRaw } from "vue-router";
import Home from "@views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
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
  {
    path: "/projects/blurry-loading",
    name: "BlurryLoading",
    component: () => import("@views/projects/Day05/BlurryLoading.vue"),
  },
  {
    path: "/projects/scroll-animation",
    name: "ScrollAnimation",
    component: () => import("@views/projects/Day06/ScrollAnimation.vue"),
  },
  {
    path: "/projects/split-landing-page",
    name: "SplitLandingPage",
    component: () => import("@views/projects/Day07/SplitLandingPage.vue"),
  },
  {
    path: "/projects/form-wave",
    name: "FormWave",
    component: () => import("@views/projects/Day08/FormWave.vue"),
  },
  {
    path: "/projects/sound-board-original",
    name: "SoundBoardOriginal",
    component: () => import("@views/projects/Day09_original/SoundBoard.vue"),
  },
  {
    path: "/projects/sound-board",
    name: "SoundBoard",
    component: () => import("@views/projects/Day09/SoundBoard.vue"),
  },
  {
    path: "/projects/dad-jokes",
    name: "DadJokes",
    component: () => import("@views/projects/Day10/DadJokes.vue"),
  },
  {
    path: "/projects/event-keycodes",
    name: "EventKeycodes",
    component: () => import("@/views/projects/Day11/EventKeycodes.vue"),
  },
  {
    path: "/projects/faq-collapse",
    name: "FaqCollapse",
    component: () => import("@/views/projects/Day12/FaqCollapes.vue"),
  },
  {
    path: "/projects/random-choice-picker",
    name: "RandomChoicePicker",
    component: () => import("@/views/projects/Day13/RandomChoicePicker.vue"),
  },
  {
    path: "/projects/animated-navigation",
    name: "AnimatedNavigation",
    component: () => import("@/views/projects/Day14/AnimatedNavigation.vue"),
  },
  {
    path: "/projects/increment-counter",
    name: "IncrementCounter",
    component: () => import("@/views/projects/Day15/IncrementCounter.vue"),
  },
  {
    path: "/projects/drink-water",
    name: "DrinkWater",
    component: () => import("@/views/projects/Day16/DrinkWater.vue"),
  },
  {
    path: "/projects/movie-app", //17
    name: "MovieApp",
    component: () => import("@/views/projects/Day17/MovieApp.vue"),
  },
  {
    path: "/projects/sticky-navigation", //25
    name: "StickyNavigation",
    component: () => import("@/views/projects/Day25/StickyNavigation.vue"),
  },
  {
    path: "/projects/mobile-tab-navigation", // 38
    name: "MobileTabNavigation",
    component: () => import("@/views/projects/Day38/MobileTabNavigation.vue"),
  },
  {
    path: "/projects/verify-account", //41
    name: "VerifyAccount",
    component: () => import("@/views/projects/Day41/VerifyAccount.vue"),
  },
  {
    path: "/projects/todo-list", //49
    name: "TodoList",
    component: () => import("@/views/projects/Day49/TodoList.vue"),
  },
];

export default routes;
