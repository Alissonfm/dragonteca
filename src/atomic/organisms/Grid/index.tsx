import React from 'react'
import { v4 } from 'uuid'
import _map from 'lodash/map'

import MuiGrid from '@mui/material/Grid'

type GridT = {
  data: Array<any>,
  gridItem: (data: any) => React.ReactNode,
  smallSize?: number;
  mediumSize?: number;
  largeSize?: number;
}

const Grid: React.FunctionComponent<GridT> = ({ data, gridItem, smallSize = 6, mediumSize = 4 }) => {
  const mountGridIten = (item: any) => <MuiGrid key={item.id ?? v4()} item xs={smallSize} md={mediumSize}>{gridItem(item)}</MuiGrid>

  return (
    <MuiGrid container spacing={4}>
      {_map(data, mountGridIten)}
    </MuiGrid>
  )
}

export default Grid