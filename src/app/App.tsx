import React from "react"
import { CacheProvider } from "@emotion/core"
import createCache from "@emotion/cache"
import { Peace } from "./Peace"
import { Map } from "./Map"
import { Camera } from "./Camera"
import { Theme } from "./Theme"
import { Variables } from "./Variables"

const randomColor = () => {
  return (
    "rgba(" +
    [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      0.5
    ].join(",") +
    ")"
  )
}
export const myCache = createCache({
  // key: "my-prefix-key",
  prefix: false
})
export const App = () => {
  return (
    <CacheProvider value={myCache}>
      <Theme>
        <Variables>
          <Camera>
            <Map />
            {/* <Peace color={randomColor()} />
            <Peace color={randomColor()} />
            <Peace color={randomColor()} /> */}
            <Peace color="rgba(255,0,0,0.5)" />
            <Peace color="rgba(0,255,0,0.5)" />
            <Peace color="rgba(0,0,255,0.5)" />
          </Camera>
        </Variables>
      </Theme>
    </CacheProvider>
    // {/* </StyleSheetManager> */}
  )
}
