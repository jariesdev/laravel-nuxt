<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="12" md="4" sm="8">
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>{{ $t('register') }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text v-if="mustVerifyEmail" :title="$t('register')">
          <div class="alert alert-success" role="alert">
            {{ $t('verify_email_address') }}
          </div>
        </v-card-text>
        <v-card-text v-else :title="$t('register')">
          <v-form @submit.prevent="register" @keydown="form.onKeydown($event)">
            <!-- Name -->
            <v-text-field v-model="form.name" :label="$t('name')" name="name" type="text" />
            <has-error :form="form" field="name" />

            <!-- Email -->
            <v-text-field v-model="form.email" :label="$t('email')" name="email" type="email" />
            <has-error :form="form" field="email" />

            <!-- Password -->
            <v-text-field v-model="form.password" :label="$t('password')" name="password" type="password" />
            <has-error :form="form" field="password" />

            <!-- Password Confirmation -->
            <v-text-field v-model="form.password_confirmation" :label="$t('confirm_password')" name="password_confirmation" type="password" />
            <has-error :form="form" field="password_confirmation" />

            <div class="text-center">
              <v-btn to="/login" color="primary" rounded>
                <v-icon left>
                  mdi-key
                </v-icon> Login
              </v-btn>
              <!-- Submit Button -->
              <v-btn :loading="form.busy" rounded color="primary" type="submit">
                <v-icon left>
                  mdi-file-document-edit
                </v-icon>
                {{ $t('register') }}
              </v-btn>
            </div>

          </v-form>
        </v-card-text>
      </v-card>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import Form from 'vform'
import guestPage from '~/mixins/guest-page'

export default {
  mixins: [guestPage],
  layout: 'auth',
  head () {
    return { title: this.$t('register') }
  },

  data: () => ({
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    mustVerifyEmail: false
  }),

  methods: {
    async register () {
      // Register the user.
      const { data } = await this.form.post('/register')

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const { data: { token } } = await this.form.post('/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
