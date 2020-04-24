<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <v-form @submit.prevent="login" @keydown="form.onKeydown($event)">
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              name="login"
              prepend-icon="mdi-account"
              type="email"
              :class="{ 'is-invalid': form.errors.has('email') }"
            />
            <has-error :form="form" field="email" />

            <v-text-field
              id="password"
              v-model="form.password"
              :label="$t('password')"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :class="{ 'is-invalid': form.errors.has('password') }"
            />
            <has-error :form="form" field="password" />

            <!-- Remember Me -->
            <v-row no-gutters class="form-group" align="center" justify="space-between">
              <v-col>
                <v-checkbox v-model="remember" name="remember" :label="$t('remember_me')" />
              </v-col>
              <v-col class="text-right">
                <nuxt-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                  {{ $t('forgot_password') }}
                </nuxt-link>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" rounded type="submit" @click="login">
                <v-icon left>
                  mdi-key
                </v-icon>  {{ $t('login') }}
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
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
    return { title: this.$t('login') }
  },
  props: { },

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false
  }),

  methods: {
    async login () {
      let data

      // Submit the form.
      try {
        const response = await this.form.post('/login')
        data = response.data
      } catch (e) {
        return
      }

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
