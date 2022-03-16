import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export type AlertModalT = { 
  title: string, 
  content: string | React.ReactNode
  open?: boolean, 
  onClose?: () => void, 
  needConfirm?: boolean, 
  onConfirm?: () => void,
  onReject?: () => void
}

const AlertModal: React.FunctionComponent<AlertModalT> = ({ 
  title, 
  content, 
  open = false, 
  onClose = () => null, 
  needConfirm = false, 
  onConfirm = () => null, 
  onReject 
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        { needConfirm 
          ? (
            <>
              <Button onClick={onConfirm}>Sim</Button>
              <Button onClick={onReject || onClose}>Cancelar</Button>
            </>
          )
          : <Button onClick={onClose}>Ok</Button>
        } 
      </DialogActions>
    </Dialog>
  )
}

export default AlertModal