import React from "react"
import { render } from "react-dom"
import styled from "styled-components"

const NUM = 10
const SIZE = 40
const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${NUM}, ${SIZE}px);
  grid-template-columns: repeat(${NUM}, ${SIZE}px);
  grid-gap: 1em;
`
const ItemBg = styled.div`
  background: rgba(255,0,0,0.6);
  height: ${SIZE}px;
  width: ${SIZE}px;
  :hover{
    background: blue;
  }
`
const ItemPeace = styled.div`
  background: green;
  height: ${SIZE/2}px;
  width: ${SIZE}px;
  transform: rotateX(90deg) translateZ(${-SIZE/4}px)  translateY(${SIZE/4}px);

`

const Item = () => {
  return (
    <>
      <ItemBg>
        <ItemPeace />
      </ItemBg>
    </>
  )
}

const TilteCamera = styled.div`
  width: max-content;
  transform: rotateX(60deg) rotateZ(45deg);
  transform-style: preserve-3d;
`
const Center = styled.div`
  transform: translateX(calc(50% / 1.41));
  transform-style: preserve-3d;
`
const App = () => {
  return (
    <Center>
      <TilteCamera>
        <Grid>{Array(NUM * NUM).fill(<Item />)}</Grid>
      </TilteCamera>
    </Center>
  )
}

render(<App />, document.querySelector("#root"))
