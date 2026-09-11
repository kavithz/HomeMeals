import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { SRI_LANKAN_MEAL_IMAGE } from "../services/sriLankanMeals";

function CuratedMealCard({ dish, index }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: "100%", transition: "transform 180ms ease, box-shadow 180ms ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 14px 30px rgba(55, 43, 30, 0.14)" } }}>
      <CardActionArea
        onClick={() => navigate(`/meal/curated-${index}?source=curated&name=${encodeURIComponent(dish)}`)}
        sx={{ height: "100%" }}
      >
        <CardMedia component="img" sx={{ height: 170, objectFit: "cover" }} image={SRI_LANKAN_MEAL_IMAGE} alt={`${dish} Sri Lankan meal`} />
        <CardContent sx={{ p: 2 }}>
          <Chip label="Sri Lankan" size="small" color="warning" variant="outlined" sx={{ mb: 1 }} />
          <Typography variant="subtitle1" fontWeight={700}>{dish}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>View dish description</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CuratedMealCard;