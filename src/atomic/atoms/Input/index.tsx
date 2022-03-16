import React from 'react'

import {  } from '@mui/system'
import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'

import styles from './styles.module.css'

type InputT = TextFieldProps & { errorMessage?: string }

const Input: React.FunctionComponent<InputT> = ({ multiline, label, name, value, errorMessage, onChange, ...inputProps }) => {

  const inputSX = {
    width: 'inheirt',
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
    ".MuiInputLabel-root": {
      color: "black"
    }
  }

  const wrapperSX = {
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
    marinTop: '0.5rem',
    marginBottom: '1rem',
    ...(!!errorMessage && {marginBottom: '2.5rem'})
  }

  return (
    <Box sx={wrapperSX}>
      <TextField {...inputProps} multiline={multiline} sx={inputSX} label={name ?? label} name={name} value={value} onChange={onChange} error={!!errorMessage} />
      {!!errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </Box>
  )

}

export default Input