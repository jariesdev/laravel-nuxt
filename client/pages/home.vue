<template>
  <card :title="$t('home')">
    {{ $t('you_are_logged_in') }}
  </card>
</template>

<script>
import authenticatedPage from '~/mixins/authenticated-page'

export default {
  mixins: [authenticatedPage],
  layout: 'default',
  head () {
    return { title: this.$t('home') }
  }
}
</script>
