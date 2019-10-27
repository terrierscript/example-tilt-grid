import React, { useState, useEffect, useRef } from "react"
import { ItemCube } from "./ItemCube"
import { NUM } from "./Variables"
import { PanelProps } from "./Panel"
import styled from "@emotion/styled"
import { Grid } from "./Map"

type Position = {
  x: number
  y: number
}

export const PositionCalcurator = styled.div<Position>`
  z-index: -1;
  /* display:none; */
  grid-row: span ${({ y }) => y};
  grid-column: span ${({ x }) => x};
  transition: 0.5s;

  background: ${(props) => (props.theme.showMover ? "rgba(0, 0, 0, 0.1)" : "")};
  /* width: ${({ x }) => x}fr;
  height: ${({ y }) => y}fr; */
`

const clamp = (x, lower, upper) => {
  return Math.min(Math.max(x, lower), upper)
}
const rand = () => Math.floor(Math.random() * NUM)
const useMover = () => {
  const [pos, setPos] = useState({
    x: rand(),
    y: rand()
  })
  const { x, y } = pos
  const move = (dx, dy) => {
    setPos(() => {
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

const CalcuratorGrid = styled(Grid)`
  z-index: -1;
`

export const Peace = (props: PanelProps) => {
  const [x, y] = useMover()
  const [ready, setReady] = useState(false)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLElement>(null)
  useEffect(() => {
    console.log(ref, gridRef)
    if (!ref.current || !gridRef.current) {
      return
    }
    const { clientWidth, clientHeight } = ref.current
    console.log(clientWidth, clientHeight)
    setOffsetX(clientWidth)
    setOffsetY(clientHeight)
    setReady(true)
  }, [x, y])

  return (
    <>
      <CalcuratorGrid ref={gridRef}>
        <PositionCalcurator x={x} y={y} ref={ref} />
      </CalcuratorGrid>
      {ready && (
        <Move x={offsetX} y={offsetY}>
          <ItemCube {...props} />
        </Move>
      )}
    </>
  )
}
