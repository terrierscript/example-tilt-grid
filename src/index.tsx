import React, { useState, useEffect } from "react"
import { render } from "react-dom"
// import styled, { StyleSheetManager } from "styled-components"
import styled from "@emotion/styled"
import { default as sstyled } from "styled-components"
import { CacheProvider, css } from "@emotion/core"
import createCache from "@emotion/cache"

export const myCache = createCache({
  // key: "my-prefix-key",
  prefix: false
})
const NUM = 10
const SIZE = 40

type Position = {
  x: number
  y: number
}
const Grid = styled.div`
  position: absolute;
  display: grid;
  background: rgba(0, 100, 100, 0.5);
  grid-template-rows: repeat(${NUM}, ${SIZE}px);
  grid-template-columns: repeat(${NUM}, ${SIZE}px);
  /* grid-gap: 20px; */
`

// const Anim = styled.div``
const PeaceGrid = styled.div`
  background: transparent;
  position: absolute;
  display: grid;
  transition: 0.5s;
  grid-template-rows: repeat(2, max-content);
  grid-template-columns: repeat(2, max-content);
  /* grid-gap: 20px; */
`

// const PeaceGrid = sstyled<Position>(Grid)`
//   background: transparent;
//   grid-template-rows: ${(props) => `repeat(2, ${SIZE * props.x}px)`};
//   grid-template-columns: ${(props) => `repeat(2, ${SIZE * props.y}px)`};
// `

const ItemBg = styled.div`
  background: rgba(255, 0, 0, 0.6);
  border: dotted 1px blue;
  height: ${SIZE}px;
  width: ${SIZE}px;
  :hover {
    background: blue;
  }
`

const PEACE_COLOR = "rgba(0,255,0,0.6)"

const Flat = styled.div`
  position: absolute;
  height: ${SIZE}px;
  width: ${SIZE}px;
  background: ${PEACE_COLOR};
  border: 1px solid black;
`

const Trans = styled.div`
  transition: 0.5s;
`

// .attrs(({ x, y }) => ({ x, y }))
const PeacePos = styled(Trans)`
  grid-row: 2;
  grid-column: 2;
`
const MovePos = styled.div<Position>`
  grid-row: 1;
  grid-column: 1;
  transition: 0.5s;

  background: gray;
  width: ${({ x }) => x * SIZE}px;
  height: ${({ y }) => y * SIZE}px;
`
/*
   grid-row: ${(props) => props.x};
  grid-column: ${(props) => props.y}; */
const Front = styled(Flat)`
  transform: rotateX(90deg) translateZ(${-SIZE / 2}px) translateY(${SIZE / 2}px);
`
const Back = styled(Flat)`
  transform: rotateX(90deg) translateZ(${SIZE / 2}px) translateY(${SIZE / 2}px);
`
const Left = styled(Flat)`
  transform: rotateY(90deg) translateZ(${SIZE / 2}px) translateX(-${SIZE / 2}px);
`
const Right = styled(Flat)`
  transform: rotateY(90deg) translateZ(-${SIZE / 2}px)
    translateX(-${SIZE / 2}px);
`
const Bottom = styled(Flat)``
const Top = styled(Flat)`
  transform: translateZ(${SIZE}px);
`

const ItemPeace = (props) => {
  return (
    <PeacePos {...props}>
      <Bottom />
      <Front />
      <Back />
      <Left />
      <Right />
      <Top />
    </PeacePos>
  )
}

const Tile = () => {
  return <ItemBg></ItemBg>
}

const TilteCamera = styled.div`
  width: max-content;
  transform: rotateX(60deg) rotateZ(45deg) translateX(calc(100%));
  transform-style: preserve-3d;
`
const Center = styled.div`
  transform: translateX(calc(50% / 1.41)) translateY(20vh);
  /* transform-style: preserve-3d; */
`

const Camera = ({ children }) => {
  return (
    <Center>
      <TilteCamera>{children}</TilteCamera>
    </Center>
  )
}

const clamp = (x, lower, upper) => {
  return Math.min(Math.max(x, lower), upper)
}
const useKeys = () => {
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)
  const move = (dx, dy) => {
    setX((v) => clamp(v + dx, 0, NUM - 1))
    setY((v) => clamp(v + dy, 0, NUM - 1))
  }
  useEffect(() => {
    setInterval(() => {
      const d = Math.random() > 0.5 ? 1 : -1
      Math.random() > 0.5 ? move(d, 0) : move(0, d)
    }, 1000)
  }, [])
  return [x, y]
}
const App = () => {
  const [x, y] = useKeys()
  return (
    // {/* <StyleSheetManager stylisOptions={{ prefix: false }}> */}
    <CacheProvider value={myCache}>
      <Camera>
        <Grid>
          {Array(NUM * NUM)
            .fill(null)
            .map((_, i) => (
              <Tile key={i} />
            ))}
        </Grid>
        <PeaceGrid key="peace">
          <MovePos x={x} y={y} />
          <ItemPeace x={x} y={y} />
        </PeaceGrid>
      </Camera>
    </CacheProvider>
    // {/* </StyleSheetManager> */}
  )
}

render(<App />, document.querySelector("#root"))
