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
                  label="To do:">
                </v-text-field>
                <v-list>
                  <v-list-item v-for="item in todoList" :key="item._id">
                    <v-list-item-action>
                      <v-btn icon color="error" @click="removeTodo(item._id)">
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
                          <v-sheet class="pa-4">
                            <v-text-field
                              outlined
                              :value="item.title"
                              @keydown.enter="editTodo($event, item._id)"
                              disable-hints>
                            </v-text-field>
                          </v-sheet>
                        </v-menu>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{item.id}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="item.done ? 'success' : 'error'"  @click="toggleDone(item._id)">
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
import { feathers, todos } from './feathers'

export default {
  name: 'TheApp',
  data: () => ({
    todo: '',
    todoList: []
  }),

  methods: {
    async addTodo () {
      try {
        await todos.create({
          title: this.todo
        })
        await this.fetchdata()
      } catch (error) {
        console.log(error)
      } finally {
        this.todo = ''
      }
    },
    async removeTodo (id) {
      try {
        await todos.remove(id)
        await this.fetchdata()
      } catch (error) {
        console.log(error)
      }
    },
    async toggleDone (id) {
      const todo = this.todoList.find(t => t._id === id)
      try {
        await todos.patch(id, {
          done: !todo.done
        })
        await this.fetchdata()
      } catch (error) {
        console.log(error)
      }
    },
    async editTodo ($event, id) {
      try {
        await todos.patch(id, {
          title: $event.target.value
        })
        await this.fetchdata()
      } catch (error) {
        console.log(error)
      }
    },
    async fetchdata () {
      try {
        const res = await todos.find({})

        this.todoList = res.data
      } catch (err) {
        console.log('eroare', err.message)
      }
    }
  },

  async mounted () {
    try {
      await feathers.authenticate({
        strategy: 'local',
        email: 'test@test.test',
        password: 'test'
      })
      this.fetchdata()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
