import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { navActions } from 'store/navStore'

import { RootState } from 'store'
import DragonService from 'service'
import { DragonT, DragonStoreT } from 'models'

const EMPTY_DRAGON_STORE: DragonStoreT = {
  list: [],
  loading: false
}

const localReplace = (target: DragonT, list: Array<DragonT>) => {
  const newList = list.concat([])
  const index = newList.findIndex(({ id }) => id === target.id)
  if (index < 0) return list
  newList.splice(index, 1, target)

  return newList
}

const localDelete = (target: DragonT, list: Array<DragonT>) => {
  const newList = list.concat([])
  const index = newList.findIndex(({ id }) => id === target.id)
  if (index >= 0) newList.splice(index, 1)

  return newList
}

const dragonSlice = createSlice({
  name: 'dragon',
  initialState: EMPTY_DRAGON_STORE,
  reducers: {
    fillList: (state, action: PayloadAction<Array<DragonT>>) => {

      return {...state, list: action.payload}
    },
    selectDragon: (state, action: PayloadAction<DragonT>) => {

      return { ...state, selected: action.payload}
    },
    createDragon: (state, action: PayloadAction<DragonT>) => {

      return { ...state, list: state.list.concat([action.payload])}
    },
    updateDragon: (state, action: PayloadAction<DragonT>) => {

      return { ...state, list: localReplace(action.payload, state.list)}
    },
    deleteDragon: (state, action: PayloadAction<DragonT>) => {

      return { ...state, selected: undefined, list: localDelete(action.payload, state.list)}
    },
    toggleLoading: (state) => {

      return { ...state, loading: !state.loading}
    }
  }
})

// async actions
export const dragonActions = {
  getDragonList: (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await DragonService.getAll()
    if (response?.status === 200) {
      dispatch(dragonSlice.actions.fillList(response.data))
    }
  },

  createDragon: (payload: DragonT): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await DragonService.create(payload)
    if(response?.status === 200 || response?.status === 201) {
      dispatch(dragonSlice.actions.createDragon(response.data))
      dispatch(navActions.navigate('/home'))
    }
  },

  updateDragon: (payload: DragonT): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await DragonService.update(payload)
    if(response?.status === 200) {
      dispatch(dragonSlice.actions.updateDragon(response.data))
      dispatch(navActions.navigate('/home'))
    }
  },

  deleteDragon: (payload: DragonT): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await DragonService.delete(payload.id)
    if(response?.status === 200) {
      dispatch(dragonSlice.actions.deleteDragon(payload))
    }
  },

  selectDragon: (payload: string): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(dragonSlice.actions.toggleLoading())
    const response = await DragonService.getById(payload)
    if(response?.status === 200) {
      dispatch(dragonSlice.actions.selectDragon(response.data))
      dispatch(dragonSlice.actions.toggleLoading())
    }
  },
}

export default dragonSlice.reducer