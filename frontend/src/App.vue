<template>
  <v-app>
    <v-app-bar color="primary" dense app>
      <v-spacer></v-spacer>
      <template v-if="authenticated">
        {{ authenticated }}
      </template>
      <template v-else>
        pls log in
      </template>
      <v-spacer></v-spacer>
      <v-btn icon @click="logOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
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
                        <v-icon x-small>mdi-plus</v-icon>
                        {{parseDate(item.createdAt)}}
                      </v-list-item-subtitle>

                      <v-list-item-subtitle>
                        <v-icon x-small>mdi-pencil</v-icon>
                        {{parseDate(item.updatedAt)}}
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
        <v-dialog v-model="dialog" width="75vw" persistent>
          <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-text-field
                outlined
                v-model="email"
                append-outer-icon="mdi-email"
                hint="Email"
                label="Email"
                id="email">
              </v-text-field>
              <v-text-field
                type="password"
                outlined
                v-model="pass"
                append-outer-icon="mdi-lock"
                hint="Pass"
                label="Pass"
                id="pass">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="login" id="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'TheApp',
  data: () => ({
    todo: '',
    email: null,
    pass: null,
    dialog: false
  }),

  computed: {
    todoList () {
      return this.$store.getters.todos
    },
    authenticated () {
      return this.$store.getters.email
    }
  },

  watch: {
    authenticated: {
      immediate: true,
      handler (value) {
        if (!value) {
          this.dialog = true
        } else {
          this.dialog = false
        }
      }
    }
  },

  methods: {
    parseDate (d) {
      return new Date(d).toLocaleString('ro-RO')
    },
    addTodo () {
      this.$store.dispatch('addTodo', this.todo)
      this.todo = ''
    },
    removeTodo (id) {
      this.$store.dispatch('removeTodo', id)
    },
    toggleDone (id) {
      this.$store.dispatch('toggleDone', id)
    },
    editTodo ($event, id) {
      this.$store.dispatch('editTodo', { id, value: $event.target.value })
    },

    login () {
      this.$store.dispatch('login', { email: this.email, pass: this.pass })
      this.email = null
      this.pass = null
      this.dialog = false
    },
    async logOut () {
      this.$store.dispatch('logout')
    }
  },

  async mounted () {
    this.$store.dispatch('reAuthenticate')
  }
}
</script>
