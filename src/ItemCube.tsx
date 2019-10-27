import React from "react"
import styled from "@emotion/styled"
import { VAR_SIZE } from "./Variables"
import { Panel, PanelProps } from "./Panel"

// .attrs(({ x, y }) => ({ x, y }))

const Front = styled(Panel)`
  transform: rotateX(90deg) translateZ(calc(-1 * ${VAR_SIZE} / 2))
    translateY(calc(${VAR_SIZE} / 2));
`
const Back = styled(Panel)`
  transform: rotateX(90deg) translateZ(calc(${VAR_SIZE} / 2))
    translateY(calc(${VAR_SIZE} / 2));
`
const Left = styled(Panel)`
  transform: rotateY(90deg) translateZ(calc(${VAR_SIZE} / 2))
    translateX(calc(-1 * ${VAR_SIZE} / 2));
`
const Right = styled(Panel)`
  transform: rotateY(90deg) translateZ(calc(-1 * ${VAR_SIZE} / 2))
    translateX(calc(-1 * ${VAR_SIZE} / 2));
`
const Bottom = styled(Panel)``
const Top = styled(Panel)`
  transform: translateZ(${VAR_SIZE});
`
export const ItemCube = (props: PanelProps) => {
  return (
    <>
      <Bottom {...props} />
      <Front {...props} />
      <Back {...props} />
      <Left {...props} />
      <Right {...props} />
      <Top {...props} />
    </>
  )
}
