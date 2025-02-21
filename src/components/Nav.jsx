import {
  AppBar,
  Toolbar,
  Typography,
  // Button,
  Box,
  Container,
} from "@mui/material"
// import { Link } from "react-router-dom"

export default function Nav() {
  return (
    <AppBar
      position="static"
      color="primary"
    >
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "300" }}
          >
            Моят Ресторант
          </Typography>
          <Box>
            {/* <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button> */}
            {/* <Button
              color="inherit"
              component={Link}
              to="/admin"
            >
              Admin
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/upload"
            >
              Upload
            </Button> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
