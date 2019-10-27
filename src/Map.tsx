import React, { useRef } from "react"
import { NUM, SIZE } from "./const"
import styled from "@emotion/styled"

export const Grid = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(${NUM}, ${SIZE}px);
  grid-template-columns: repeat(${NUM}, ${SIZE}px);
  /* background: rgba(0, 100, 100, 0.5); */
  /* grid-gap: 10px; */
`

export const ItemBg = styled.div`
  /* background: rgba(255, 0, 0, 0.6); */
  border: dotted 1px blue;
  height: ${SIZE}px;
  width: ${SIZE}px;
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
