import { DragonStoreT, NavStoreT, UserStoreT } from 'models'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from 'store'

export const useStoreDispatch = () => useDispatch<AppDispatch>()
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector

export const useDragonStore = () => useStoreSelector<DragonStoreT>((state) => state.dragon)
export const useUserStore = () => useStoreSelector<UserStoreT>((state) => state.user)
export const useNavStore = () => useStoreSelector<NavStoreT>((state) => state.navigation)