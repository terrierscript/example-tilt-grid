import styled from "@emotion/styled"
import { VAR_SIZE } from "./Variables"
export type PanelProps = {
  color: string
}
export const Panel = styled.div<PanelProps>`
  position: absolute;
  height: ${VAR_SIZE};
  width: ${VAR_SIZE};
  background: ${({ color }) => color || "white"};
  border: 1px solid black;
`
