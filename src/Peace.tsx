import React, { useState, useEffect, useRef } from "react"
import { ItemCube } from "./ItemCube"
import { NUM, SIZE } from "./const"
import { PanelProps, Panel } from "./Panel"
import styled from "@emotion/styled"
import { Grid } from "./Map"
import { Variables } from "./Variables"

// const Anim = styled.div``
// export const PeaceGrid = styled.div`
//   background: transparent;
//   position: absolute;
//   display: grid;
//   transition: 0.5s;
//   grid-template-rows: repeat(2, max-content);
//   grid-template-columns: repeat(2, max-content);
//   /* grid-gap: 20px; */
// `

type Position = {
  x: number
  y: number
}

export const MoverPos = styled.div<Position>`
  z-index: -1;
  grid-row: span ${({ y }) => y};
  grid-column: span ${({ x }) => x};
  transition: 0.5s;

  background: ${(props) => (props.theme.showMover ? "rgba(0, 0, 0, 0.1)" : "")};
  /* width: ${({ x }) => x}fr;
  height: ${({ y }) => y}fr; */
`

const PeacePos = styled.div<Position>`
  grid-row: 2;
  grid-column: 2;
`

const clamp = (x, lower, upper) => {
  return Math.min(Math.max(x, lower), upper)
}
const rand = () => Math.floor(Math.random() * NUM)
const useMover = () => {
  const [pos, setPos] = useState({
    x: 3, // rand(),
    y: 4 //rand()
  })
  const { x, y } = pos
  const move = (dx, dy) => {
    setPos(({ x, y }) => {
      return {
        x: clamp(dx, 0, NUM),
        y: clamp(dy, 0, NUM)
      }
    })
  }
  useEffect(() => {
    setInterval(() => {
      move(rand(), rand())
    }, 1000)
  }, [])
  return [x, y]
}

const Move = styled.div<Position>`
  position: absolute;
  transform: ${({ x, y }) =>
    `translate(calc( ${x}px + var(--gap)), calc( ${y}px + var(--gap)))`};
  transition: 0.5s;
  transform-style: preserve-3d;
`

export const Peace = (props: PanelProps) => {
  const [x, y] = useMover()
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const ref = useRef()
  const gridRef = useRef()
  useEffect(() => {
    if (!ref.current || !gridRef.current) {
      return
    }
    console.log(gridRef)
    setOffsetX(ref.current.clientWidth)
    setOffsetY(ref.current.clientHeight)
  }, [x, y])

  return (
    <>
      <Grid key="peace" ref={gridRef}>
        <MoverPos x={x} y={y} ref={ref} />
        {/* <PeacePos> */}
        {/* <Panel />
      </PeacePos> */}
      </Grid>
      <Move x={offsetX} y={offsetY}>
        <ItemCube {...props} />
      </Move>
    </>
  )
}
