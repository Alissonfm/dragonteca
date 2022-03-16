import React from 'react'
import Box from '@mui/material/Box'

import HistoryEditor from 'atomic/molecules/HistoryEditor'
import HistoryViewer from 'atomic/molecules/HistoryViewer'

import Bg from 'assets/images/historyPattern2.png'

type HistoryT = {
  value: string,
  canEdit?: boolean,
  onChange?: (newValue: string) => void,
  onRemove?: () => void
}

const History: React.FunctionComponent<HistoryT> = ({ value, canEdit = false, onChange = () => null, onRemove = () => null }) => {
  const [editionMode, setEditionMode] = React.useState<boolean>(false)
  const toggleEditionMode = () => setEditionMode(() => !editionMode)
  
  const onDoneEditing = (newValue: string) => {
    toggleEditionMode()
    onChange(newValue)
  }

  const wrapperSX = {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-end',
    padding: '1.5rem',
    borderRadius: '1.5rem',
    marginBottom: '5rem',
    border: '1px solid transparent',
    borderImageSource: `url(${Bg})`,
    borderImageWidth: '4rem',
    borderImageRepeat: 'round',
    borderImageSlice: '160',
    borderImageOutset: '0.85rem',
    backgroundColor: 'rgba(21, 101, 192, 0.125)',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    '&:last-item': {
      marginBottom: 'initial'
    },
  }

  const Component = editionMode 
    ? () => <HistoryEditor value={value} onChange={onDoneEditing} onCancel={toggleEditionMode} /> 
    : () => <HistoryViewer value={value} showActions={canEdit} onEdit={toggleEditionMode} onRemove={onRemove} />

  return (
    <Box sx={wrapperSX}><Component /></Box>
  )
}

export default History