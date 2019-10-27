import React, { useState } from "react"
import { ThemeProvider } from "emotion-theming"
export const Theme = ({ children }) => {
  const [theme, setTheme] = useState({
    showMover: false
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
