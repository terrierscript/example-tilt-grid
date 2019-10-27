import React, { useState, useEffect } from "react"
import { ItemCube } from "./ItemCube"
import { NUM, SIZE } from "./const"
import { PanelProps } from "./Panel"
import styled from "@emotion/styled"

// const Anim = styled.div``
export const PeaceGrid = styled.div`
  background: transparent;
  position: absolute;
  display: grid;
  transition: 0.5s;
  grid-template-rows: repeat(2, max-content);
  grid-template-columns: repeat(2, max-content);
  /* grid-gap: 20px; */
`

export const MoverPos = styled.div<Position>`
  grid-row: 1;
  grid-column: 1;
  transition: 0.5s;

  background: ${(props) => (props.theme.showMover ? "rgba(0, 0, 0, 0.1)" : "")};
  width: ${({ x }) => x * SIZE}px;
  height: ${({ y }) => y * SIZE}px;
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
    setPos(({ x, y }) => {
      return {
        x: clamp(dx, 0, NUM - 1),
        y: clamp(dy, 0, NUM - 1)
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
export const Peace = (props: PanelProps) => {
  const [x, y] = useMover()
  return (
    <PeaceGrid key="peace">
      <MoverPos x={x} y={y} />
      <ItemCube {...props} />
    </PeaceGrid>
  )
}
