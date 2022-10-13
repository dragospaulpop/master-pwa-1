<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row>
          <v-col align-center class="text-center">
            <v-card>
              <v-card-title>TO DO List:</v-card-title>
              <v-card-text>
                <v-text-field
                  outlined
                  v-model="todo"
                  @keydown.enter="addTodo"
                  append-outer-icon="mdi-plus"
                  @click:append-outer="addTodo"
                  hint="Add your todo"
                  label="To do:"></v-text-field>
                <v-list>
                  <v-list-item v-for="(item, index) in todoList" :key="item.value">
                    <v-list-item-action>
                      <v-btn icon color="error" @click="removeTodo(index)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title :class="{ 'text-decoration-line-through': item.done }">{{ item.value }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="item.done ? 'success' : 'error'"  @click="toggleDone(index)">
                        <v-icon>
                          {{ item.done ? 'mdi-check' : 'mdi-close' }}
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
