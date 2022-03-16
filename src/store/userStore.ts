import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { navActions } from 'store/navStore'

import store from 'store'
import lsHelper from 'store/lsHelper'
import { UserT, UserStoreT } from 'models'

const EMPTY_USER_STORE: UserStoreT = {
  authenticated: false,
  user: {
    name: '',
    mail: ''
  }
} 

const userSlice = createSlice({
  name: 'user',
  initialState: EMPTY_USER_STORE,
  reducers: {
    persistedLogin: (state, action: PayloadAction<UserT>) => {
      lsHelper.save('user', action.payload)
      return { ...state, user: action.payload, authenticated: true }
    },
    login: (state, action: PayloadAction<UserT>) => {
      return { ...state, user: action.payload, authenticated: true }
    },
    logout: () => {
      lsHelper.remove('user')
      return EMPTY_USER_STORE
    },
  }
})

export const userActions = {
  ...userSlice.actions,

  checkCachedUser: () => {
    const user = lsHelper.get('user')
    console.log("Usuário já estava logado? --- ", user)
    if (!!user) {
      store.dispatch(userSlice.actions.login(user))
      store.dispatch(navActions.navigate('/'))
    } else {
      store.dispatch(userSlice.actions.logout())
    }
  }
}

export default userSlice.reducer