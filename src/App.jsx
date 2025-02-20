import { useState } from "react"
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Tabs,
  Tab,
  styled,
  Box,
} from "@mui/material"
import PropTypes from "prop-types"

// Styled components
const MenuCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s",
  maxWidth: 350, // Set a max width for each menu card
  width: "100%", // Ensure it stretches to the available space
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}))

const MacroChip = styled(Chip)(({ theme }) => ({
  margin: "2px",
  backgroundColor: theme.palette.primary.light,
}))

App.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
      macros: PropTypes.shape({
        calories: PropTypes.number,
        protein: PropTypes.number,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number,
      }).isRequired,
    })
  ).isRequired,
}

export default function App({ menuItems }) {
  const [selectedCategory, setSelectedCategory] = useState("Всички")

  const categories = ["Всички", "Риба", "Месо", "Салата", "Десерти"]

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Tabs
        value={selectedCategory}
        onChange={(e, newValue) => setSelectedCategory(newValue)}
        centered
        sx={{ mb: 4 }}
      >
        {categories.map((cat) => (
          <Tab
            label={cat}
            value={cat}
            key={cat}
          />
        ))}
      </Tabs>

      <Grid2
        container
        spacing={4}
        justifyContent="flex-start" // Align items to the left for better wrapping
      >
        {menuItems
          .filter(
            (item) =>
              selectedCategory === "Всички" ||
              item.category === selectedCategory
          )
          .map((item) => (
            <Grid2
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
            >
              <MenuCard>
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.name}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                  >
                    {item.name}
                    <Typography
                      color="textSecondary"
                      component="span"
                      ml={1}
                    >
                      {item.price} лв.
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    paragraph
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap", // Make sure ingredients wrap
                      gap: 1,
                    }}
                  >
                    {item.ingredients.map((ing) => (
                      <Chip
                        label={ing}
                        size="small"
                        key={ing}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap", // Make sure macros wrap
                      gap: 1,
                      marginTop: "1rem",
                    }}
                  >
                    {Object.entries(item.macros).map(([key, value]) => (
                      <MacroChip
                        key={key}
                        label={`${key}: ${value}`}
                        size="small"
                      />
                    ))}
                  </Box>
                </CardContent>
              </MenuCard>
            </Grid2>
          ))}
      </Grid2>
    </Container>
  )
}
