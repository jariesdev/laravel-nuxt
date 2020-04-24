import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
export default new Vuetify({
  customVariables: ['~/assets/sass/_variables.scss'],
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  defaultAssets: {
    font: true,
    icons: 'md'
  },
  icons: {
    iconfont: 'mdi' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#4caf50',
          secondary: {
            base: '#ff8c00',
            lighten3: '#ffb700',
            darken3: '#ff6200'
          },
          tertiary: {
            base: '#4682bf',
            lighten3: '#4696bf',
            darken3: '#466ebf'
          },
          accent: '#9c27b0'
        }
      }
    }
  },
})
