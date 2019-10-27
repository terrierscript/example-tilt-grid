import React from "react"
import styled from "@emotion/styled"
import { SIZE } from "./const"
import { Panel, PanelProps } from "./Panel"

// .attrs(({ x, y }) => ({ x, y }))
const PeacePos = styled.div`
  grid-row: 2;
  grid-column: 2;
`
const Front = styled(Panel)`
  transform: rotateX(90deg) translateZ(${-SIZE / 2}px) translateY(${SIZE / 2}px);
`
const Back = styled(Panel)`
  transform: rotateX(90deg) translateZ(${SIZE / 2}px) translateY(${SIZE / 2}px);
`
const Left = styled(Panel)`
  transform: rotateY(90deg) translateZ(${SIZE / 2}px) translateX(-${SIZE / 2}px);
`
const Right = styled(Panel)`
  transform: rotateY(90deg) translateZ(-${SIZE / 2}px)
    translateX(-${SIZE / 2}px);
`
const Bottom = styled(Panel)``
const Top = styled(Panel)`
  transform: translateZ(${SIZE}px);
`
export const ItemCube = (props: PanelProps) => {
  return (
    <PeacePos>
      <Bottom {...props} />
      <Front {...props} />
      <Back {...props} />
      <Left {...props} />
      <Right {...props} />
      <Top {...props} />
    </PeacePos>
  )
}
