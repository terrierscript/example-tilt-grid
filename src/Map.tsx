import React, { useRef, useState, useEffect } from "react"
import { NUM, SIZE } from "./const"
import styled from "@emotion/styled"

export type GridProp = {
  size: number
  num: number
  bg: string
}
const Grid = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(10, 40px);
  grid-template-columns: repeat(10, 40px);
  grid-gap: 1em;
`

export const ItemBg = styled.div`
  border: dotted 1px blue;
  width: 100%;
  height: 100%;
  :hover {
    background: blue;
  }
`
export const ItemBg2 = styled(ItemBg)`
  border: dotted 1px red;
  grid-column: span 2;
  grid-row: span 2;
  :hover {
    background: red;
  }
`

const Grid2 = styled(Grid)<{ z: number }>`
  transform: translateZ(${({ z }) => z}em);
  transition: 0.5s;
`

export const Map = () => {
  return (
    <Grid>
      {Array(NUM * NUM)
        .fill(null)
        .map((_, i) => (
          <ItemBg size={SIZE} key={i} />
        ))}
    </Grid>
  )
}
const Trans = styled.div`
  transition: 0.5s;
`
export const Map2 = () => {
  const [z, setZ] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setZ((z) => (z === 0 ? 3 : 0))
    }, 1000)
  }, [])
  return (
    // <Grid2 size={SIZE * 2} num={NUM / 2} bg={"rgba(0,0,255,0.5)"}>
    <Trans>
      <Grid2 z={z}>
        {Array((NUM / 2) * (NUM / 2))
          .fill(null)
          .map((_, i) => (
            <ItemBg2 key={i} size={SIZE * 2} />
          ))}
      </Grid2>
    </Trans>
  )
}
