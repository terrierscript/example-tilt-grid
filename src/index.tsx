import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { render } from "react-dom"
// import styled, { StyleSheetManager } from "styled-components"
import styled from "@emotion/styled"
import { default as sstyled } from "styled-components"
import { CacheProvider, css } from "@emotion/core"
import createCache from "@emotion/cache"
import { ThemeProvider } from "emotion-theming"

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
  /* background: rgba(0, 100, 100, 0.5); */
  grid-template-rows: repeat(${NUM}, ${SIZE}px);
  grid-template-columns: repeat(${NUM}, ${SIZE}px);
  /* grid-gap: 10px; */
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

const ItemBg = styled.div`
  /* background: rgba(255, 0, 0, 0.6); */
  border: dotted 1px blue;
  height: ${SIZE}px;
  width: ${SIZE}px;
  :hover {
    background: blue;
  }
`

const PEACE_COLOR = "rgba(0,255,0,0.6)"

type Cube = { color: string }
const Panel = styled.div<Cube>`
  position: absolute;
  height: ${SIZE}px;
  width: ${SIZE}px;
  background: ${({ color }) => color || PEACE_COLOR};
  border: 1px solid black;
`

const Trans = styled.div`
  transition: 0.5s;
`

const MoverPos = styled.div<Position>`
  grid-row: 1;
  grid-column: 1;
  transition: 0.5s;

  background: ${(props) => (props.theme.showMover ? "rgba(0, 0, 0, 0.1)" : "")};
  width: ${({ x }) => x * SIZE}px;
  height: ${({ y }) => y * SIZE}px;
`

// .attrs(({ x, y }) => ({ x, y }))
const PeacePos = styled(Trans)`
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

const ItemCube = (props: Cube) => {
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

const TilteCamera = styled.div`
  width: max-content;
  transform: rotateX(60deg) rotateZ(45deg) translateX(calc(100%));
  transform-style: preserve-3d;
`
const Center = styled.div`
  transform: translateX(50vw) translateY(25vh);
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

const MapTile = () => {
  const ref = useRef()
  return <ItemBg />
}

const Map = () => {
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
const Peace = (props: Cube) => {
  const [x, y] = useMover()
  return (
    <PeaceGrid key="peace">
      <MoverPos x={x} y={y} />
      <ItemCube {...props} />
    </PeaceGrid>
  )
}

const Theme = ({ children }) => {
  const [theme, setTheme] = useState({
    showMover: true
  })
  const changeMover = (e) => {
    const v = e.target.checked
    setTheme((theme) => ({
      ...theme,
      showMover: v
    }))
  }
  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <div>
        <label>
          <input
            type="checkbox"
            checked={theme.showMover}
            onChange={changeMover}
          ></input>
          Show mover
        </label>
      </div>
      {children}
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <CacheProvider value={myCache}>
      <Theme>
        <Camera>
          <Map />
          <Peace color="rgba(255,0,0,0.5)" />
          <Peace color="rgba(0,255,0,0.5)" />
          <Peace color="rgba(0,0,255,0.5)" />
        </Camera>
      </Theme>
    </CacheProvider>
    // {/* </StyleSheetManager> */}
  )
}

render(<App />, document.querySelector("#root"))
