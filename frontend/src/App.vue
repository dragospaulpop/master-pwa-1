<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row>
          <v-col>
            <v-btn block @click="whoNext">Who next?</v-btn>
          </v-col>
        </v-row>
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
                  label="To do:">
                </v-text-field>
                <v-list>
                  <v-list-item v-for="item in todoList" :key="item.id">
                    <v-list-item-action>
                      <v-btn icon color="error" @click="removeTodo(item.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title :class="{ 'text-decoration-line-through': item.done }">
                        {{ item.title }}
                        <v-menu :close-on-content-click="false" offset-x>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon color="blue" v-bind="attrs" v-on="on">
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <v-text-field
                            outlined
                            :value="item.title"
                            @keydown.enter="editTodo($event, item.id)"
                            disable-hints>
                          </v-text-field>
                        </v-menu>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{item.id}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="item.done ? 'success' : 'error'"  @click="toggleDone(item.id)">
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
    whoNext () {
      alert(`Winner: ${Math.floor(Math.random() * 4 + 1)}`)
    },
    async addTodo () {
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.todo
          })
        })
        if (response.ok) {
          this.fetchdata()
        } else {
          const error = await response.text()
          throw new Error(error)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async removeTodo (id) {
      try {
        const response = await fetch('http://localhost:3000/todos/' + id, {
          method: 'delete'
        })
        if (response.ok) {
          this.fetchdata()
        } else {
          const error = await response.text()
          throw new Error(error)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async toggleDone (id) {
      const todo = this.todoList.find(t => t.id === id)
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            done: !todo.done
          })
        })
        if (response.ok) {
          this.fetchdata()
        } else {
          const error = await response.text()
          throw new Error(error)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editTodo ($event, id) {
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: $event.target.value
          })
        })
        if (response.ok) {
          this.fetchdata()
        } else {
          const error = await response.text()
          throw new Error(error)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async fetchdata () {
      try {
        const response = await fetch('http://localhost:3000/todos')
        if (response.ok) {
          const result = await response.json()
          this.todoList = result
        } else {
          const error = await response.text()
          throw new Error(error)
        }
      } catch (err) {
        console.log('eroare', err.message)
      }
    }
  },

  async mounted () {
    this.fetchdata()
  }
}
</script>
