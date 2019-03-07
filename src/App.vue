<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted () {
    this.sockets.subscribe('loggedin', (data) => {
      // получаем данные о чатах
      this.$store.commit('update_chat', data)

      if (data.role === 'operator') {
        // если вошел оператор то перенаправлем на страницу с выбором доступных чатов
        this.$router.push('/app')
      } else {
        // если вошел пользователь то перенаправляем на страницу с чатом этого пользователя
        this.$router.push('/app/' + data.id)
      }
    })
  }
}
</script>

<style>
</style>
