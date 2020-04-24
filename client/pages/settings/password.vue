<template>
  <div>
    <form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('password_updated')" />

      <!-- Password -->
      <v-text-field v-model="form.password" :label="$t('new_password')" type="password" name="password" />
      <has-error :form="form" field="password" />

      <!-- Password Confirmation -->
      <v-text-field v-model="form.password_confirmation" :label="$t('confirm_password')" type="password" name="password" />
      <has-error :form="form" field="password_confirmation" />

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
  </div>
</template>

<script>
import Form from 'vform'
import authenticatedPage from '~/mixins/authenticated-page'

export default {
  mixins: [authenticatedPage],
  scrollToTop: false,

  head () {
    return { title: this.$t('settings') }
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update () {
      await this.form.patch('/settings/password')

      this.form.reset()
    }
  }
}
</script>
