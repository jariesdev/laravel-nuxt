<template>
  <div class="row">
    <div class="col-md-3">
      <card :title="$t('settings')" class="settings-card">
        <v-tabs>
          <v-tab v-for="tab in tabs" :key="tab.route">
            <router-link :to="{ name: tab.route }" class="text-decoration-none">
              {{ tab.name }}
            </router-link>
          </v-tab>
        </v-tabs>
      </card>
    </div>

    <div class="col-md-9">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import guestPage from '~/mixins/authenticated-page'

export default {
  mixins: [guestPage],

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
