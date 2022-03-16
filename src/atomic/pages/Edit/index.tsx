import React from 'react'
import { Navigate } from 'react-router-dom'

import Fab from '@mui/material/Fab'

import { useDragonStore, useStoreDispatch } from 'helpers/hooks'
import { dragonActions } from 'store/dragonStore'

import Page from 'atomic/templates/Page'
import DragonEditorForm from 'atomic/organisms/DragonEditorForm'

import pageBg from 'assets/images/bg7.jpg'

const Edit: React.FunctionComponent<any> = () => {
  const { selected, loading } = useDragonStore()
  const dispatcher = useStoreDispatch()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  if (!selected) return <Navigate to="/home" />

  if (loading) return <span>carregando...</span>

  const onReceiveChanges = (newData: any) => {
    console.log("Submiting data", newData)
    dispatcher(dragonActions.updateDragon(newData))
  }

  const updateDragon = () => triggerRef.current?.click()

  const updateFAB = (
    <Fab key="update-dragon-fab" sx={{ 'svg': { fontSize: '1.75rem' }}} color='primary' onClick={updateDragon} title="Atualizar dragão" aria-label="Atualizar dragão">
      <i className="fa-solid fa-check"></i>
    </Fab>
  )

  return (
    <Page title={`Atualizando informações sobre: ${selected.name}`} background={pageBg} glassContainer fabs={[updateFAB]} fullHeight>
      <DragonEditorForm initialValues={selected} onSubmit={onReceiveChanges} triggerRef={triggerRef}/>
    </Page>
  )
}

export default Edit