import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from 'helpers/hooks'
import { userActions } from 'store/userStore'

type RouteGuardPropsT = { children: React.ReactNode }
type RouteGuardContextT = { auth: boolean, checkAuth: () => void }
const EMPTY_ROUTE_GUARD_CONTEXT: RouteGuardContextT = { auth: false, checkAuth: () => null }
const RGContext = React.createContext<RouteGuardContextT>(EMPTY_ROUTE_GUARD_CONTEXT)

const RouteGuard: React.FunctionComponent<RouteGuardPropsT> = ({ children }) => {
  const { authenticated: auth } = useUserStore()
  const checkAuth = () => userActions.checkCachedUser()

  if (!auth) return <Navigate to="/login" />
  return <RGContext.Provider value={{ auth, checkAuth }}>{children}</RGContext.Provider>
}

export default RouteGuard