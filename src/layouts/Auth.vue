<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-card class="fixed-center">
                <q-card-section>
                    <div class="text-h6">Log In</div>
                </q-card-section>

                <q-card-section>
                    <q-input filled v-on:keyup.enter="submit" v-model="login"/>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <q-btn
                            color="primary"
                            :disabled="!login"
                            @click="submit"
                    >Log In</q-btn>
                </q-card-section>
            </q-card>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
  data () {
    return {
      login: ''
    }
  },
  methods: {
    submit: function () {
      if (this.login) {
        this.$socket.emit('login', { login: this.login })
      }
    }
  }
}
</script>

<style scoped>

</style>
