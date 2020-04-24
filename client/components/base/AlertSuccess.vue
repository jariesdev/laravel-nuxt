<template>
  <v-alert v-if="form.successful" type="success" dismissible>
    <slot>
      <div v-html="message" />
    </slot>
  </v-alert>
</template>

<script>
import AlertSuccess from 'vform/src/components/AlertSuccess'

export default {
  name: 'AlertSuccess',
  extends: AlertSuccess
}
</script>
