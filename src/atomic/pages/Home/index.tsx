import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Fab from '@mui/material/Fab'

import { useStoreDispatch, useDragonStore } from 'helpers/hooks'
import { dragonActions } from 'store/dragonStore'

import DragonCard from 'atomic/molecules/DragonCard'
import Grid from 'atomic/organisms/Grid'
import Page from 'atomic/templates/Page'
import { DragonT } from 'models'

import pageBg from 'assets/images/bg3.jpg'

const Home: React.FunctionComponent<any> = () => {
  const navigator = useNavigate()
  const dispatcher = useStoreDispatch()
  const { list } = useDragonStore()

  const createDragon = () => navigator('/create')
  const refreshList = React.useCallback(() => dispatcher(dragonActions.getDragonList()), [dispatcher])
  const onSelectDragon = (dragonTarget: DragonT) => dispatcher(dragonActions.selectDragon(dragonTarget.id))

  React.useEffect(() => {
    refreshList()
  }, [refreshList])

  const mountGridItem = (itemData: DragonT) => {
    return (
      <Link to="/details" style={{ textDecoration: 'none' }}>
        <DragonCard dragonData={itemData} onClick={() => onSelectDragon(itemData)} />
      </Link>
    )
  }

  const newDragonFAB = (
    <Fab key="new-dragon-fab" color='primary' onClick={createDragon} title="Adicionar dragão" aria-label="Adicionar dragão">
      <i className="fa-solid fa-book-medical" />
    </Fab>
  )

  const refreshFAB = (
    <Fab key="refresh-dragon-list-fab" color='primary' onClick={refreshList} title="Atualizar lista" aria-label="Atualizar lista">
      <i className="fa-solid fa-rotate-right" />
    </Fab>
  )

  return (
    <Page title="Dragonteca" background={pageBg} fabs={[newDragonFAB, refreshFAB]} hideTitle fullHeight>
      <Grid data={list} gridItem={mountGridItem} />
    </Page>
  )
}

export default Home