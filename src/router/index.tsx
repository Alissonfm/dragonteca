import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { useStoreDispatch, useNavStore } from 'helpers/hooks'
import { navActions } from 'store/navStore'

import RouteGuard from 'atomic/atoms/RouteGuard'
import { Details, Home, Login, Edit, Create } from 'atomic/pages'

const MainRouter: React.FC<any> = () => {
  const navigator = useNavigate()
  const dispatcher = useStoreDispatch()
  const { to: navigateTo } = useNavStore()

  React.useEffect(() => {
    if (navigateTo !== ''){
      navigator(navigateTo)
      dispatcher(navActions.navigate(''))
    }
  }, [navigateTo, dispatcher, navigator])

  return (
    <Routes>
      <Route path="/" element={<RouteGuard><Home /></RouteGuard>} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<RouteGuard><Home /></RouteGuard>} />
      <Route path="/details" element={<RouteGuard><Details /></RouteGuard>} />
      <Route path="/edit" element={<RouteGuard><Edit /></RouteGuard>} />
      <Route path="/create" element={<RouteGuard><Create /></RouteGuard>} />
      <Route path="*" element={<RouteGuard><Home /></RouteGuard>} />
    </Routes>
  )
}

export default MainRouter