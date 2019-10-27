import React, { useLayoutEffect } from "react"
import { render } from "react-dom"
// import styled, { StyleSheetManager } from "styled-components"
import styled from "@emotion/styled"
import { default as sstyled } from "styled-components"
import { CacheProvider, css } from "@emotion/core"
import createCache from "@emotion/cache"
import { Peace } from "./Peace"
import { Map } from "./Map"
import { Camera } from "./Camera"
import { Theme } from "./Theme"

export const myCache = createCache({
  // key: "my-prefix-key",
  prefix: false
})

const App = () => {
  return (
    <CacheProvider value={myCache}>
      <Theme>
        <Camera>
          <Map />
        </Camera>
      </Theme>
    </CacheProvider>
    // {/* </StyleSheetManager> */}
  )
}

render(<App />, document.querySelector("#root"))
