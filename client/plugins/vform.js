import Vue from 'vue'
import { HasError } from 'vform'
import AlertSuccess from '~/components/base/AlertSuccess'
import AlertError from '~/components/base/AlertError'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertSuccess.name, AlertSuccess)
