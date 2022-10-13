<template>
  <div>
   <h1>TO DO List:</h1>
   <input type="text" v-model="todo" @keydown.enter="addTodo">
   <button @click="addTodo">add todo</button>
   <ul>
    <li
      v-for="(item, index) in todoList"
      :key="item.value"
      :class="{ 'todo-done': item.done }">
      <button @click="removeTodo(index)">🗑</button>
      {{ item.value }}
      <button v-if="item.done" @click="toggleDone(index)">
        ✔
      </button>
      <button v-else @click="toggleDone(index)">
        x
      </button>
    </li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'TheApp',
  data: () => ({
    todo: '',
    todoList: []
  }),

  methods: {
    addTodo () {
      if (this.todo.length) {
        const position = this.todoList.findIndex(todo => todo.value === this.todo)

        if (position === -1) {
          this.todoList.push({
            value: this.todo,
            done: false
          })
          this.todo = ''
        }
      }
    },
    removeTodo (index) {
      this.todoList.splice(index, 1)
    },
    toggleDone (index) {
      this.todoList[index].done = !this.todoList[index].done
    }
  }
}
</script>

<style>
  .todo-done {
    text-decoration: line-through;
  }
</style>
