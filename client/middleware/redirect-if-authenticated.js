import axios from 'axios'

export default async ({ store, req, redirect }) => {
  if (store.getters['auth/check']) {
    return redirect('/')
  } else {
    return redirect('/login')
  }
}
