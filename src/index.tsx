import React, { useLayoutEffect } from "react"
import { render } from "react-dom"
// import styled, { StyleSheetManager } from "styled-components"
import styled from "@emotion/styled"
import { default as sstyled } from "styled-components"
import { css } from "@emotion/core"
import { App } from "./app/App"

render(<App />, document.querySelector("#root"))
