import Vue from 'vue'
import Vuex from 'vuex'
import { feathers, todos } from '@/feathers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: {
      email: null
    },
    todos: []
  },
  getters: {
    email: state => state.authenticated.email,
    todos: state => state.todos
  },
  mutations: {
    setEmail (state, payload) {
      state.authenticated.email = payload
    },
    setTodos (state, payload) {
      state.todos = payload
    }
  },
  actions: {
    async reAuthenticate ({ commit, dispatch }) {
      try {
        const result = await feathers.reAuthenticate()
        const { user } = result
        commit('setEmail', user.email)
        dispatch('fetchTodos')
      } catch (err) {
        console.log(err)
      }
    },
    async login ({ commit, dispatch }, payload) {
      try {
        const result = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.pass
        })

        const { user } = result
        commit('setEmail', user.email)
        dispatch('fetchTodos')
      } catch (err) {
        console.log(err)
      }
    },
    async logout ({ commit }) {
      try {
        await feathers.logout()
        commit('setEmail', null)
        commit('setTodos', [])
      } catch (err) {
        console.log(err)
      }
    },
    async fetchTodos ({ commit }) {
      try {
        const res = await todos.find({})

        commit('setTodos', res.data)
      } catch (err) {
        console.log('eroare', err.message)
      }
    },
    async addTodo ({ dispatch }, payload) {
      try {
        await todos.create({
          title: payload
        })
        dispatch('fetchTodos')
      } catch (err) {
        console.log(err)
      }
    },
    async removeTodo ({ dispatch }, payload) {
      try {
        await todos.remove(payload)
        dispatch('fetchTodos')
      } catch (error) {
        console.log(error)
      }
    },
    async toggleDone ({ state, dispatch }, payload) {
      const todo = state.todos.find(t => t._id === payload)
      try {
        await todos.patch(payload, {
          done: !todo.done
        })
        dispatch('fetchTodos')
      } catch (error) {
        console.log(error)
      }
    },
    async editTodo ({ dispatch }, payload) {
      try {
        await todos.patch(payload.id, {
          title: payload.value
        })
        dispatch('fetchTodos')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
