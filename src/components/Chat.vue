<template>
    <div>
        <div ref="chat" class="q-pa-lg">
            <q-chat-message v-for="(message, index) in history" :key="index"
                            :text="[message.text]"
                            :name="(message.id === chat.id) ? 'You' : message.author"
                            :sent="(message.id === chat.id)"
                            :bg-color="(message.id === chat.id) ? '' : 'amber-5'"
            />
        </div>
        <q-footer bordered class="bg-white text-primary">
            <q-toolbar>
                <div class="col q-pa-sm">
                    <q-input rounded outlined v-on:keyup.enter="submit" v-model="text[$route.params.id]"/>
                </div>
                <div class="col-sm-auto q-pa-sm">
                    <q-btn
                            round
                            color="primary"
                            icon="send"
                            size="lg"
                            :disabled="!text[$route.params.id]"
                            @click="submit"
                    />
                </div>
            </q-toolbar>
        </q-footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      text: {}
    }
  },
  computed: {
    history: {
      get () {
        return this.$store.getters.history(this.$route.params.id)
      }
    },
    chat: {
      get () {
        return this.$store.getters.chat
      }
    }
  },
  mounted () {
    this.$socket.emit('get_history', { history_id: +this.$route.params.id })
  },
  updated () {
    window.scrollBy(0, this.$refs.chat.scrollHeight)
  },
  watch: {
    '$route' (to, from) {
      const id = this.$route.params.id

      // запрашиваем историю при переходе в другой чат
      if (!this.$store.getters.history(id)) {
        this.$socket.emit('get_history', { history_id: +id })
      }

      // защита от перехода в другой чат пользователем
      if (this.$store.getters.chat.role === 'user' && this.$store.getters.chat.id !== id) {
        this.$router.push('/app/' + this.$store.getters.chat.id)
      }
    }
  },
  methods: {
    submit: function () {
      const id = this.$route.params.id

      // отправка сообщения
      if (this.text[id]) {
        this.$socket.emit('new_message', {
          history_id: +id,
          message: {
            id: this.chat.id,
            author: this.chat.login,
            text: this.text[id]
          }
        })

        this.text[id] = ''
      }
    },
    scroll () {

    }
  }
}
</script>

<style scoped>

</style>
