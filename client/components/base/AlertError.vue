<template>
  <v-alert v-if="form.errors.any()" type="error" dismissible>
    <slot>
      <div v-html="message" />
    </slot>
  </v-alert>
</template>

<script>
import AlertSuccess from 'vform/src/components/AlertError'

export default {
  name: 'AlertErrror',
  extends: AlertSuccess
}
</script>
