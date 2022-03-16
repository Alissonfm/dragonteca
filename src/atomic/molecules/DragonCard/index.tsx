import React from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { DragonT } from 'models'

import bookPattern from 'assets/images/pattern1.jpg'
import draconicBorder from 'assets/images/draconicBorder2.png'

import styles from './styles.module.css'

const DragonCard: React.FunctionComponent<{ dragonData: DragonT, onClick: () => void }> = ({ dragonData, onClick }) => {
  const { name, type } = dragonData

  const boxSX = {
    transition: 'all 0.35s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.075)',
      boxShadow: '0 0.5rem 0.75rem rgba(0,0,0,0.4)'
    }
  }

  const cardSX = {
    position: 'relative',
    backgroundImage: `url(${bookPattern})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '5px solid transparent',
    borderImageSource: `url(${draconicBorder})`,
    borderImageRepeat: 'round',
    borderImageSlice: '75',
    borderImageWidth: '25px',
    borderImageOutset: '7px',
    '> *': {
      zIndex: 1
    },
    '&::before': {
      top: 0,
      left: 0,
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 0
    }
  }

  return (
    <Box sx={boxSX} onClick={onClick}>
      <Card sx={cardSX}>
        <CardContent>
          <Box sx={{ padding: '0.5rem', display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
            <Avatar sx={{ backgroundColor: 'rgba(0,0,0,0.75)', boxShadow: 'inset 0px -1px 0px rgba(255,255,255,0.75)' }}>
              <i className="fa-solid fa-dragon" />
            </Avatar>
            <h4 className={styles.bookTitle}>{name}</h4>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DragonCard