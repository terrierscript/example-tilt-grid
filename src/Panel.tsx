import styled from "@emotion/styled"
import { SIZE } from "./const"
export type PanelProps = {
  color: string
}
export const Panel = styled.div<PanelProps>`
  position: absolute;
  height: ${SIZE};
  width: ${SIZE};
  background: ${({ color }) => color || "white"};
  border: 1px solid black;
`
