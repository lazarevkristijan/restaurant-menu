import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import Nav from "./components/Nav.jsx"
import menuItems from "./data/menu-items.json"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
// import AdminPanel from "./components/AdminPanel.jsx"
// import ImageUpload from "./components/ImageUploader.jsx"

const theme = createTheme({
  palette: {
    primary: {
      main: "#a8ffb8", // Brand color
    },
    secondary: {
      main: "#4ECDC4",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial",
  },
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      style={{
        background: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://www.pngmart.com/files/13/Pattern-PNG-Transparent.png')`,
        backgroundRepeat: "repeat",
      }}
    >
      <Router>
        <ThemeProvider theme={theme}>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={<App menuItems={menuItems} />}
            />
            {/* <Route
              path="/admin"
              element={<AdminPanel menuItems={menuItems} />}
            />
            <Route
              path="/upload"
              element={<ImageUpload />}
            /> */}
            <Route
              path="/hi"
              element={<h2>Hello, you found the secret spot!</h2>}
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  </StrictMode>
)
