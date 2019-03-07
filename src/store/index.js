import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'
import { Notify } from 'quasar'
import config from '../../config'

const env = process.env.NODE_ENV || 'development',
  debug = (env !== 'production')

Vue.use(Vuex)

let store = new Vuex.Store({
  strict: true,
  state: {
    chat: {},
    history: {}
  },
  getters: {
    chat: (state) => state.chat,
    history: (state) => (id) => state.history[id]
  },
  mutations: {
    update_login (state, login) {
      state.login = login
    },
    update_chat (state, chat) {
      state.chat = chat
    },

    socket_history (state, data) {
      state.history = { ...state.history, [data.history_id]: data.messages }
    },

    socket_update_history (state, data) {
      if (state.history[data.history_id]) {
        state.history[data.history_id].push(data.message)
      }
    }
  },
  actions: {
    socket_error_message ({ commit, state }, message) {
      Notify.create(message)
    }
  }
})

Vue.use(new VueSocketIO({
  debug,
  connection: config[env].backend,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
}))

export default store
