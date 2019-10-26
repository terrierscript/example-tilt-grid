import React from "react"
import { render } from "react-dom"
import styled from "styled-components"

const NUM = 10
const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${NUM}, 1vh);
  grid-template-columns: repeat(${NUM}, 1vh);
  grid-gap: 1em;
`
const ItemBg = styled.div`
  background: red;
  height: 20px;
  width: 20px;
  :hover{
    background: blue;
  }
`
const ItemPeace = styled.div`
  background: green;
  height: 10px;
  width: 20px;
  transform: rotateX(90deg);
  transform-origin: top;

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
