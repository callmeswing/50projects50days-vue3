import { ref } from "vue";

export const imageList = ref<{ [key: string]: any }[]>([
  {
    title: "Tokyo",
    active: true,
    url: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Seoul",
    active: false,
    url: "https://images.pexels.com/photos/18495179/pexels-photo-18495179/free-photo-of-seoul-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Paris",
    active: false,
    url: "https://images.pexels.com/photos/3105066/pexels-photo-3105066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "London",
    active: false,
    url: "https://images.pexels.com/photos/220887/pexels-photo-220887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Lhasa",
    active: false,
    url: "https://images.pexels.com/photos/29370347/pexels-photo-29370347/free-photo-of-scenic-view-of-potala-palace-and-tibetan-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]);
