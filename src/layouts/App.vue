<template>
    <q-layout view="hHr Lpr lFr">
        <q-header>
            <q-toolbar>
                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        aria-label="Menu"
                        icon="menu"
                        v-if="chat.role === 'operator'"
                />

                <q-toolbar-title>
                    Chat
                </q-toolbar-title>

                <!--<div>Quasar v{{ $q.version }}</div>-->
            </q-toolbar>
        </q-header>

        <q-drawer
                v-model="leftDrawerOpen"
                bordered
                content-class="bg-grey-2"
                v-if="chat.role === 'operator'"
        >
            <q-list>
                <q-item-label header>Chats</q-item-label>

                <q-item clickable v-for="(user, index) in chat.users" :key="index" :to="'/app/' + user.id">
                    <q-item-section avatar>
                        <q-icon name="face"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{user.login}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view v-if="$route.params.id"/>
            <div v-else class="q-pa-lg relative-position">
                <p class="text-body1 text-weight-thin">Choose chat in sidebar panel</p>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    chat: {
      get () {
        return this.$store.getters.chat
      }
    }
  },
  mounted () {
    // перенаправление на форму входа если нет данных чата в store
    if (!this.$store.getters.chat.id) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
