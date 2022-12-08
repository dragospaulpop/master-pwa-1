import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#3f51b5',
        secondary: '#009688',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#4caf50'
      }
    }
  }
})
