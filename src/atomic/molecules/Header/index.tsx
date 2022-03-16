import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'

import { useUserStore, useStoreDispatch } from 'helpers/hooks'
import { userActions } from 'store/userStore'

const Header: React.FunctionComponent = () => {
  const locator = useLocation()
  const dispatcher = useStoreDispatch()
  const { user: { name } } = useUserStore()
  const onLogout = () => dispatcher(userActions.logout())
  const canGoBack = locator.pathname !== '/' && locator.pathname !== '/home'
  const onBackPress = () => window.history.back()

  const wrapperSX = { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    zIndex: 1,
  }

  const headerSX = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    width: 'inherit',
    padding: '0.5rem 0',
    'h1': {
      fontSize: '1rem',
    },
    '@media screen and (min-width: 768px)': {
      'h1': {
        fontSize: '1.75rem'
      }
    }
  }

  const actionsSX = {
    justifySelf: 'flex-end',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const presentationSX = {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    paddingRight: '0.5rem',
    borderRight: '1px solid gray',
    ' > span': {
      marginRight: '0.5rem'
    },
    'strong[data-fullname]': {
      display: 'none'
    },
    'strong[data-firstname]': {
      display: 'block',
    },
    '@media screen and (min-width: 768px)': {
      'strong[data-fullname]': {
        display: 'block'
      },
      'strong[data-firstname]': {
        display: 'none',
      },
    }
  }

  const backButtonSX = {
    marginRight: '0.25rem',
    paddingLeft: '0.6rem',
    paddingRight: '0.6rem',
    backgroundColor: 'rgba(0,0,0,0.125)',
    'svg': {
      color: 'black',
      fontSize: '0.75rem'
    },
    '@media screen and (min-width: 768px)': {
      marginRight: '0.5rem',
      paddingLeft: '0.8rem',
      paddingRight: '0.8rem',
      'svg': {
        fontSize: '1.5rem'
      }
    }
  }

  const logoutButtonSX = {
    marginLeft: '0.5rem',
    color: 'black',
    backgroundColor: 'rgba(0,0,0,0.125)',
    'svg': {
      fontSize: '0.75rem'
    },
    '@media screen and (min-width: 768px)': {
      'svg': {
        fontSize: '1.5rem'
      }
    }
  }

  return (
    <Box sx={wrapperSX} className="glass">
      <Container>
        <Box sx={headerSX}>
          <Box sx={actionsSX}>
            {canGoBack && <IconButton sx={backButtonSX} title="Voltar" onClick={onBackPress}><i className="fa-solid fa-angle-left" /></IconButton>}
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/home"><h1 style={{ margin: '0.25rem 0' }}>Dragonteca</h1></Link>
          </Box>

          <Box sx={actionsSX}>
            <Box sx={presentationSX}><span>Olá, </span><strong data-fullname>{name}</strong><strong data-firstname>{name.trim().split(' ')[0]}</strong></Box>
            <IconButton sx={logoutButtonSX} title="Sair" onClick={onLogout}><i className="fa-solid fa-arrow-right-from-bracket" /></IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header