import styled from "@emotion/styled"
export const NUM = 10

export const Variables = styled.div`
  --gap: 1em;
  --size: 40px;
  --num: ${NUM};
`

export const VAR_NUM = "var(--num)"
export const VAR_SIZE = "var(--size)"
