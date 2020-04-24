<template>
  <form @submit.prevent="update" @keydown="form.onKeydown($event)">
    <alert-success :form="form" :message="$t('info_updated')" />

    <!-- Name -->
    <v-text-field v-model="form.name" :label="$t('name')" type="text" name="name" />
    <has-error :form="form" field="name" />

    <!-- Email -->
    <v-text-field v-model="form.email" :label="$t('email')" type="email" name="name" />
    <has-error :form="form" field="email" />

    <!-- Submit Button -->
    <div class="d-flex">
      <div class="ml-md-auto">
        <v-btn :loading="form.busy" type="submit" color="success">
          <v-icon left>
            mdi-content-save
          </v-icon>
          {{ $t('update') }}
        </v-btn>
      </div>
    </div>
  </form>
</template>

<script>
import Form from 'vform'
import { mapGetters } from 'vuex'
import authenticatedPage from '~/mixins/authenticated-page'

export default {
  mixins: [authenticatedPage],
  scrollToTop: false,

  head () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: ''
    })
  }),

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    // Fill the form with user data.
    this.form.keys().forEach((key) => {
      this.form[key] = this.user[key]
    })
  },

  methods: {
    async update () {
      const { data } = await this.form.patch('/settings/profile')

      this.$store.dispatch('auth/updateUser', { user: data })
    }
  }
}
</script>
