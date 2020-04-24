<template>
  <card :title="$t('home')">
    {{ $t('you_are_logged_in') }}
  </card>
</template>

<script>
import guestPage from '~/mixins/authenticated-page'

export default {
  mixins: [guestPage],
  layout: 'default',
  head () {
    return { title: this.$t('home') }
  }
}
</script>
