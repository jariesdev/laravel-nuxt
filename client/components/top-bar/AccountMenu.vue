<template>
  <v-menu
    :offset-y="true"
    origin="center center"
    transition="scale-transition"
    bottom
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar color="indigo" size="32">
          <img
            v-if="user && user.photo_url"
            :src="user.photo_url"
          >
          <v-icon v-else dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list :nav="true" dense>
      <v-list-item @click="$router.push({name:'settings.profile'})">
        <v-list-item-title>
          {{ user.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>
          {{ $t('logout') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountMenu',

  data: () => ({
    appName: process.env.appName
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
  .profile-photo {
    width: 2rem;
    height: 2rem;
    margin: -.375rem 0;
  }
</style>
