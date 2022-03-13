import React from 'react'
import { Routes, Route } from 'react-router-dom'
import _map from 'lodash/map'

import lsHelper from 'store/lsHelper'
import { Details, Home, Login, Register } from 'atomic/pages'

// type RouteT = { 
//   name: string;
//   path: string;
//   element: React.FunctionComponent<any>;
//   children?: React.FunctionComponent<any>;
// }

// type RouteListT = Array<RouteT>

// const PRIVATE_ROUTES: RouteListT = [
//   { name: 'Default', path: '*', element: (props) => <Home {...props} /> },
//   { name: 'Home', path: 'home', element:  (props) => <Home {...props} /> },
//   { name: 'Details', path: 'details', element: (props) => <Details {...props} /> }
// ]

// const PUBLIC_ROUTES: RouteListT = [
//   { name: 'Login', path: '*', element: (props) => <Login {...props} /> },
//   { name: 'Login', path: '', element: (props) => <Login {...props} /> },
//   { name: 'Register', path: 'register', element: (props) => <Register {...props} /> }
// ]

const MainRouter: React.FC<any> = () => {
  const autenticated = !!lsHelper.get('user')

  if(!autenticated) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/details" element={<Details />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
  </Routes>
  )
}

export default MainRouter