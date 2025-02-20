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
} from "@mui/material"
import PropTypes from "prop-types"
import { useTheme } from "@mui/material/styles"
import { useMediaQuery } from "@mui/material"

// Styled components
const MenuCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s",
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

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")) // Check if the screen is small (mobile)
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")) // Check if the screen is between mobile and desktop

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
              key={item.id}
              style={{
                width: isMobile
                  ? "100%" // Full width on mobile
                  : isTablet
                  ? "50%" // Half width on tablet
                  : "30%", // 30% width on desktop
              }}
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

                  <div style={{ display: "flex" }}>
                    {item.ingredients.map((ing) => (
                      <Chip
                        label={ing}
                        size="small"
                        key={ing}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </div>

                  <div style={{ marginTop: "1rem" }}>
                    {Object.entries(item.macros).map(([key, value]) => (
                      <MacroChip
                        key={key}
                        label={`${key}: ${value}г`}
                        size="small"
                      />
                    ))}
                  </div>
                </CardContent>
              </MenuCard>
            </Grid2>
          ))}
      </Grid2>
    </Container>
  )
}
