import React from 'react'
import classnames from 'classnames'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Header from 'atomic/molecules/Header'

import styles from './styles.module.css'

type PageProps = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  background?: string;
  glassContainer?: boolean;
  fullHeight?: boolean;
  hideTitle?: boolean;
  hideHeader?: boolean;
  fabs?: React.ReactNodeArray;
}

const Page: React.FunctionComponent<PageProps> = (props) => {
  const { className, children, title, hideTitle, background, glassContainer, fullHeight, hideHeader, fabs = [] } = props
  const containerClasses = classnames([ className, (glassContainer && !!background) && 'glass', fullHeight && styles.fullHeight ])

  const fabWrapperSX = {
    display: 'flex',
    flexFlow: 'column nowrap',
    position: 'fixed',
    bottom: '0.75rem',
    right: '0.75rem',
    zIndex: 2,
    ' > *': {
      transform: 'scale(0.75)',
      marginBottom: '0.75rem'
    },
    '> *:last-child': {
      transform: 'initial',
      marginBottom: 'initial'
    },
    '* svg': {
      fontSize: '1.5rem'
    },
    '@media screen and (min-width: 768px)': {
      bottom: '2rem',
      right: '2.5rem'
    }
  }

  return (
    <div className={styles.pageWrapper}>
      {!hideHeader && <Header />}
      {fabs.length > 0 && <Box sx={fabWrapperSX}>{fabs}</Box>}
      <Container className={containerClasses}>
        {!!title && (<h1 className="pageTitle" {...(hideTitle && {style: {display: 'none'}})}>{title}</h1>)}
        {children}
      </Container>
      {!!background && <div style={{ backgroundImage: `url(${background})` }} className={styles.background} />}
    </div>
  )
}

export default Page