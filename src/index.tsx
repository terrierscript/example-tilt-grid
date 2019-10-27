import React, { useState } from "react"
import { render } from "react-dom"
import styled, { StyleSheetManager } from 'styled-components'
const NUM = 10
const SIZE = 40

const Grid = styled.div`
  position: absolute;

  background: rgba(0,100,100,0.5);
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
  grid-row: ${(props) => props.x};
  grid-column: ${(props) => props.y};
  background: green;
  z-index: 2;
  height: ${SIZE}px;
  width: ${SIZE}px;
  transform: rotateX(90deg) 
    /* translateZ(${-SIZE}px)  */
    /* translateY(${SIZE/2}px); */
  ;
`

const Item = () => {
  return (
    <>
      <ItemBg>
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
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)
  return (
    <Center>
      <StyleSheetManager stylisOptions={{ prefix: false }}>
        <TilteCamera>
          <Grid>{Array(NUM * NUM)
            .fill(null)
            .map((_,i) => <Item key={i} />)}
          </Grid>
          <Grid>
          <ItemPeace x={x} y={y} />

          </Grid>
        </TilteCamera>
     </StyleSheetManager>
      </Center>
  )
}

render(<App />, document.querySelector("#root"))
