<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" sm="8">
      <v-card :title="$t('reset_password')" class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>{{ $t('reset_password') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="send" @keydown="form.onKeydown($event)">
            <alert-success :form="form" :message="status" />

            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              name="email"
              prepend-icon="mdi-email"
              type="email"
              :class="{ 'is-invalid': form.errors.has('email') }"
            />
            <has-error :form="form" field="email" />

            <!-- Submit Button -->
            <div class="form-group row">
              <div class="col-md-9 ml-md-auto text-center">
                <v-btn to="/login" color="primary" rounded>
                  <v-icon left>
                    mdi-key
                  </v-icon> Login
                </v-btn>
                <v-btn :loading="form.busy" color="primary" rounded>
                  <v-icon left>
                    mdi-email
                  </v-icon> {{ $t('send_password_reset_link') }}
                </v-btn>
              </div>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Form from 'vform'
import guestPage from '~/mixins/guest-page';

export default {
  mixins: [guestPage],
  layout: 'auth',
  head () {
    return { title: this.$t('reset_password') }
  },

  data: () => ({
    status: '',
    form: new Form({
      email: ''
    })
  }),

  methods: {
    async send () {
      const { data } = await this.form.post('/password/email')

      this.status = data.status

      this.form.reset()
    }
  }
}
</script>
