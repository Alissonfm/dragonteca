import React from 'react'
import _map from 'lodash/map'
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'

import { dragonActions } from 'store/dragonStore'
import { useDragonStore, useStoreDispatch } from 'helpers/hooks'

import Page from 'atomic/templates/Page'
import History from 'atomic/organisms/History'
import AlertModal, { AlertModalT } from 'atomic/organisms/AlertModal'

import DetailsBG from 'assets/images/bg2.jpg'

const Details: React.FunctionComponent<any> = () => {
  const navigator = useNavigate()
  const dispatcher = useStoreDispatch()
  const { selected, loading } = useDragonStore()

  const emptyModal: AlertModalT = { open: false, needConfirm: false, title: '', content: '', onClose: () => null }
  const [alertProps, setAlert] = React.useState<AlertModalT>(emptyModal)
  const closeModal = () => setAlert(() => emptyModal)
  const openModal = (data: AlertModalT) => setAlert(() => ({ ...data, open: true, onClose: () => closeModal() }))

  const haveHistories = selected?.histories && selected.histories.length > 0

  if (!selected || loading) return <span>carregando...</span>

  const historiesSection = haveHistories ? _map(selected.histories, (history) => <History key={v4()} value={history} />) : (<span>Poxa, esse dragão ainda não tem histórias...</span>)

  const updateDragon = () => navigator('/edit')

  const onDeleteClick = () => {
    openModal({ 
      title: 'Atenção!', 
      content: `Você quer mesmo deletar o dragrão ${selected.name}?`,
      needConfirm: true,
      onConfirm: () => {
        closeModal()
        dispatcher(dragonActions.deleteDragon(selected))
        navigator('/home')
      }
    })
  }

  const deleteFAB = (
    <Fab key="delete-dragon-fab" color='primary' onClick={onDeleteClick} title="Editar dados do dragão" aria-label="Editar dados do dragão">
      <i className="fa-solid fa-trash-can"></i>
    </Fab>
  )

  const editFAB = (
    <Fab key="edit-dragon-fab" color='primary' onClick={updateDragon} title="Editar dados do dragão" aria-label="Editar dados do dragão">
      <i className="fa-solid fa-pen"></i>
    </Fab>
  )

  return (
    <Page title={`Sobre ${selected.name}`} fabs={[deleteFAB, editFAB]} fullHeight>
      <AlertModal {...alertProps} />
      <Divider sx={{ marginBottom: '1.5rem' }} />
      <h3 style={{ marginBottom: '1.5rem' }}>Tipo: {selected.type}</h3>
      <Divider sx={{ marginBottom: '1.5rem' }} />
      <h4 style={{ marginBottom: '1rem' }}>Histórias: </h4>
      {historiesSection}
    </Page>
  )
}

export default Details