import React, { useState, useEffect } from "react"
import { render } from "react-dom"
// import styled, { StyleSheetManager } from "styled-components"
import styled from "@emotion/styled"
import { CacheProvider } from "@emotion/core"
import createCache from "@emotion/cache"

export const myCache = createCache({
  // key: "my-prefix-key",
  prefix: false
})
const NUM = 10
const SIZE = 40

const Grid = styled.div`
  position: absolute;
  background: rgba(0, 100, 100, 0.5);
  display: grid;
  grid-template-rows: repeat(${NUM}, ${SIZE}px);
  grid-template-columns: repeat(${NUM}, ${SIZE}px);
  grid-gap: 1em;
  translate: 0.5s;
`

const ItemBg = styled.div`
  background: rgba(255, 0, 0, 0.6);
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
const PeacePos = styled.div<{ x: number; y: number }>`
  grid-row: ${(props) => props.x};
  grid-column: ${(props) => props.y};
`
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

const Item = () => {
  return (
    <>
      <ItemBg></ItemBg>
    </>
  )
}

const TilteCamera = styled.div`
  width: max-content;
  transform: rotateX(60deg) rotateZ(45deg) translateX(calc(100%));
  transform-style: preserve-3d;
`
const Center = styled.div`
  transform: translateX(calc(50% / 1.41));
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
  useEffect(() => {
    setInterval(() => {
      const d = 0.5 - Math.random() > 0 ? 1 : -1
      Math.random() > 0.5
        ? setX((v) => clamp(v + d, 0, NUM))
        : setY((v) => clamp(v + d, 0, NUM))
    }, 1000)
  }, [])
  console.log()
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
              <Item key={i} />
            ))}
        </Grid>
        <Grid>
          <ItemPeace x={x} y={y} />
        </Grid>
      </Camera>
    </CacheProvider>
    // {/* </StyleSheetManager> */}
  )
}

render(<App />, document.querySelector("#root"))
