import type { ProjectCard } from "../types/projectCard";

export const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: "Expanding Cards",
    image: new URL("@/assets/images/day01.png", import.meta.url),
    link: "/projects/expanding-cards",
  },
  {
    id: 2,
    title: "Progress Steps",
    image: new URL("@/assets/images/day02.png", import.meta.url),
    link: "/projects/progress-steps",
  },
  {
    id: 3,
    title: "Rotating Navigation Animation",
    image: new URL("@/assets/images/day03.png", import.meta.url),
    link: "/projects/rotating-navigation-animation",
  },
  {
    id: 4,
    title: "Hidden Search",
    image: new URL("@/assets/images/day04.png", import.meta.url),
    link: "/projects/hidden-search",
  },
];
