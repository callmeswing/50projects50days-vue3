<template>
  <div class="container">
    <h2>Todos</h2>
    <button @click="reset" id="btn-reset" v-show="todoList.length > 0">
      reset
    </button>
    <form class="form" @submit.prevent="addTodo(todo_text)">
      <input
        ref="input"
        type="text"
        class="input"
        placeholder="Enter you todo.."
        autocomplete="off"
        maxlength="12"
        v-model="todo_text"
      />
      <ul class="todos">
        <li
          class="todo"
          v-for="item in todoList"
          :key="item.id"
          @click="todoDone(item)"
          :class="{ done: item.isDone }"
        >
          {{ item.todo }}
          <button class="del-btn" @click="todoDel(item.id)" type="button">
            <div class="line line-one"></div>
            <div class="line line-two"></div>
          </button>
        </li>
      </ul>
    </form>
    <small v-html="bottom_info"></small>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { notification } from "ant-design-vue";

/** ⭐ 目标：1.数组添加todo 2.状态可以反转 3.可以单独去除 4.可以reset （限制为7项，做提示）*/
/** ⭐ 目标：存储到localstorage */

const bottom_info =
  "Left click to toggle completed.  <br>Right click to delete todo";

const todo_text = ref<string>("");

interface TodoItem {
  id: number;
  todo: string;
  isDone: boolean;
}
const todoList = reactive<TodoItem[]>([]);

/** 添加项 */
function addTodo(todo: string) {
  todo = todo.trim();
  console.log(todo);

  // 校验1：无输入，提示
  if (!todo) {
    triggerShake();
    return;
  }
  // 校验2：当前只允许7项，提示
  if (todoList.length >= 7) {
    notification.warn({
      message: "少即是多",
      description: "todo项不可超过7个",
    });
    todo_text.value = "";
    return;
  }
  // 校验3：重复项目，可提示
  if (todoList.filter((item) => item.todo === todo).length > 0) {
    notification.warn({
      message: "重复咯",
      description: "存在重复todo项",
    });
    return;
  }

  // id-check
  let id_pool = [1, 2, 3, 4, 5, 6, 7];
  todoList.forEach((item) => {
    id_pool = id_pool.filter((id) => id !== item.id);
  });
  console.log(id_pool);
  let id = id_pool[0];

  todoList.push({
    id: id,
    todo: todo,
    isDone: false,
  });
  // reset
  todo_text.value = "";
}

/** 状态反转 */
function todoDone(item: TodoItem) {
  item.isDone = !item.isDone;
}

/** 删除项 */
function todoDel(id: number) {
  let index = todoList.findIndex((item) => item.id === id);
  if (index !== -1) {
    todoList.splice(index, 1); // ✅ splice 会触发响应式更新
  }
}

/** reset */
function reset() {
  // 从索引 0 开始，删掉所有元素，保持 Proxy 不变
  todoList.splice(0, todoList.length);
}

// 抖动动画
const input = ref<HTMLElement | null>(null);
const triggerShake = () => {
  if (input.value) {
    // 直接在脚本中操作DOM的class属性
    input.value.classList.remove("shake"); // 先移除，确保能重新触发动画
    void input.value.offsetWidth; // 强制重绘，重新触发 animation
    input.value.classList.add("shake");
  }
};
</script>

<style lang="scss" scoped>
@use "./todo-list.scss";
</style>
