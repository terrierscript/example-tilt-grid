import React, { useRef } from "react"
import { NUM, SIZE } from "./const"
import styled from "@emotion/styled"

export const Grid = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(${NUM}, ${SIZE});
  grid-template-columns: repeat(${NUM}, ${SIZE});
  /* background: rgba(0, 100, 100, 0.5); */
  grid-gap: var(--gap, 10px);
  transition: 0.5s;
`

export const ItemBg = styled.div`
  /* background: rgba(255, 0, 0, 0.6); */
  border: dotted 1px blue;
  height: ${SIZE};
  width: ${SIZE};
  :hover {
    background: blue;
  }
`

const MapTile = () => {
  const ref = useRef()
  return <ItemBg />
}
export const Map = () => {
  return (
    <Grid>
      {Array(NUM * NUM)
        .fill(null)
        .map((_, i) => (
          <MapTile key={i} />
        ))}
    </Grid>
  )
}
