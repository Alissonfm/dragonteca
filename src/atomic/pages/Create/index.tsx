import React from 'react'

import Fab from '@mui/material/Fab'

import { useStoreDispatch } from 'helpers/hooks'
import { dragonActions } from 'store/dragonStore'

import Page from 'atomic/templates/Page'
import DragonEditorForm from 'atomic/organisms/DragonEditorForm'
import { DragonT } from 'models'

import pageBg from 'assets/images/bg5.jpg'

const Create: React.FunctionComponent<any> = () => {
  const dispatcher = useStoreDispatch()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const onReceiveChanges = (newData: any) => {
    console.log("Submiting data", newData)
    dispatcher(dragonActions.createDragon({ ...newData, createdAt: new Date().toISOString() }))
  }

  const createDragon = () => triggerRef.current?.click()

  const createFAB = (
    <Fab key="save-dragon-fab" sx={{ 'svg': { fontSize: '1.75rem' }}} color='primary' onClick={createDragon} title="Adicionar dragão" aria-label="Adicionar dragão">
      <i className="fa-solid fa-check"></i>
    </Fab>
  )

  const emptyDragon: DragonT = { name: '', type: '', histories: [], createdAt: '', id: '' }

  return (
    <Page title="Novo dragão" background={pageBg} glassContainer fabs={[createFAB]} fullHeight>
      <DragonEditorForm initialValues={emptyDragon} onSubmit={onReceiveChanges} triggerRef={triggerRef}/>
    </Page>
  )
}

export default Create