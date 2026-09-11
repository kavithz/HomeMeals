// components/MealCard.jsx
// A reusable card used to display a single meal's summary (image, name,
// category, area) inside a grid. Clicking it navigates to the meal's
// detail page. Used on the Home page and the Search page.

import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

/**
 * @param {Object} props
 * @param {Object} props.meal - normalized meal object { mealId, name, category, area, thumbnail }
 *                               OR a saved meal row from our own database { id, name, category, area, thumbnail }
 * @param {"api"|"saved"} props.source - where this meal came from, used to build the correct link
 */
function MealCard({ meal, source = "api" }) {
  const navigate = useNavigate();

  // Meals coming straight from TheMealDB API use "mealId" (string),
  // meals coming from our own saved database use "id" (number).
  const idForLink = source === "saved" ? meal.id : meal.mealId;

  const handleClick = () => {
    navigate(`/meal/${idForLink}?source=${source}`);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "transform 180ms ease, box-shadow 180ms ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 14px 30px rgba(55, 43, 30, 0.14)" } }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <CardMedia
          component="img"
          sx={{ height: 190, objectFit: "cover" }}
          image={meal.thumbnail || "https://via.placeholder.com/300x180?text=No+Image"}
          alt={meal.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap title={meal.name} sx={{ fontWeight: 700 }}>
            {meal.name}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {meal.category && <Chip label={meal.category} size="small" color="success" variant="outlined" />}
            {meal.area && <Chip label={meal.area} size="small" color="warning" variant="outlined" />}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MealCard;
