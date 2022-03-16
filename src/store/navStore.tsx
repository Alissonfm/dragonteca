import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavStoreT } from 'models'


const EMPTY_NAV_STORE: NavStoreT = {
  to: ''
} 

const navSlice = createSlice({
  name: 'navigation',
  initialState: EMPTY_NAV_STORE,
  reducers: {
    navigate: (state, action: PayloadAction<string>) => {
      return { to: action.payload }
    }
  }
})

export const navActions = navSlice.actions 

export default navSlice.reducer