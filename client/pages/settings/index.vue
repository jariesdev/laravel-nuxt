<template>
  <v-row>
    <v-col cols="12">
      <v-card :title="$t('settings')" class="settings-card">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
          <v-tab v-for="tab in tabs" :key="tab.route" :to="{ name: tab.route }" class="text-decoration-none">
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-card-text>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import authenticatedPage from '~/mixins/authenticated-page'

export default {
  mixins: [authenticatedPage],

  computed: {
    tabs () {
      return [
        {
          icon: 'user',
          name: this.$t('profile'),
          route: 'settings.profile'
        },
        {
          icon: 'lock',
          name: this.$t('password'),
          route: 'settings.password'
        }
      ]
    }
  }
}
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
