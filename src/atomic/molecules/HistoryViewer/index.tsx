import React from 'react'

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import styles from './styles.module.css'

type HistoryViewerT = { value: string; showActions: boolean; onEdit: () => void; onRemove: () => void }

const HistoryViewer: React.FunctionComponent<HistoryViewerT> = ({ value, showActions = false, onEdit, onRemove }) => {
  return (
    <>
      <span className={styles.history}>{value}</span>
      {showActions && (
        <Box sx={{ paddingTop: '1rem' }}>
          <IconButton color="primary" onClick={onEdit}><i className="fa-solid fa-pen-to-square"></i></IconButton>
          <IconButton color="error" onClick={onRemove}><i className="fa-solid fa-trash-can"></i></IconButton>
        </Box>
      )}
    </>
  )
}

export default HistoryViewer
