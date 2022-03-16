import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import Input from 'atomic/atoms/Input'

type HistoryEditorT = {
  value: string;
  onChange: (newValue: string) => void;
  onCancel: () => void
}

const HistoryEditor: React.FunctionComponent<HistoryEditorT> = ({ value, onChange, onCancel }) => {
  const [history, setHistory] = React.useState<string>(value)
  const onHistoryChange = ({target: { value }}: {target: { value: string }}) => setHistory(() => value)

  const actionsSX = {
    display: 'flex',
    flexFlow: 'row nowrap'
  }

  return (
    <>
      <Input multiline label="História em edição" value={history} onChange={onHistoryChange} />
      <Box sx={actionsSX}>
        <IconButton color="success" onClick={() => onChange(history)}><i className="fa-solid fa-check"></i></IconButton>
        <IconButton onClick={onCancel}><i className="fa-solid fa-ban"></i></IconButton>
      </Box>
    </>
  )
}

export default HistoryEditor