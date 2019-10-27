import React from "react"
import styled from "@emotion/styled"
const TilteCamera = styled.div`
  width: max-content;
  transform: rotateX(60deg) rotateZ(45deg) translateX(calc(100%));
  transform-style: preserve-3d;
`
const Center = styled.div`
  transform: translateX(50vw) translateY(25vh);
`
export const Camera = ({ children }) => {
  return (
    <Center>
      <TilteCamera>{children}</TilteCamera>
    </Center>
  )
}
