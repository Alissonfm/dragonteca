import React from 'react'

import Box from '@mui/material/Box'

type LoadingT = {
  isLoading: boolean
}

const Loading: React.FunctionComponent<LoadingT> = ({ isLoading }) => {
  if (!isLoading) return null

  const flexSX = {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const boxSX = {
    ...flexSX,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  }

  const loadingBoxSX = {
    ...flexSX,
    background: 'rgba(255,255,255,0.75)',
    borderRadius: '1rem',
    'svg': {
      fontSize: '3rem'
    },
    'span': {
      display: 'block',
      marginTop: '1rem'
    }
  }

  return (
    <Box sx={boxSX}>
      <Box sx={loadingBoxSX}>
        <i className="fa-solid fa-dragon" />
        <span>Carregando dados...</span>
      </Box>
    </Box>
  )
}

export default Loading