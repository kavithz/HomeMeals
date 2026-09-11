// services/sriLankanMeals.js
// TheMealDB doesn't have a dedicated "Sri Lankan" area filter, so instead
// we keep a curated list of popular Sri Lankan dish names here and search
// TheMealDB for each one by name. Any that TheMealDB doesn't have simply
// won't appear - this list is just a starting point for the "Sri Lankan
// Favorites" section on the Home page.

export const SRI_LANKAN_DISH_NAMES = [
  "Kottu",
  "Hoppers",
  "String Hoppers",
  "Rice and Curry",
  "Kiribath",
  "Pol Sambol",
  "Fish Ambul Thiyal",
  "Dhal Curry",
  "Lamprais",
  "Watalappan",
  "Pittu",
  "Pol Roti",
];

export const SRI_LANKAN_MEAL_DETAILS = {
  Kottu: {
    description: "Chopped roti stir-fried on a hot griddle with vegetables, egg, and a choice of meat or seafood.",
    ingredients: ["Godamba roti", "Leek", "Cabbage", "Carrot", "Egg", "Onion", "Chili", "Curry powder"],
  },
  Hoppers: {
    description: "Bowl-shaped fermented rice-flour pancakes with crisp edges and a soft center, often served with sambol or curry.",
    ingredients: ["Rice flour", "Coconut milk", "Yeast", "Sugar", "Salt", "Egg (optional)"],
  },
  "String Hoppers": {
    description: "Delicate steamed rice-flour noodle nests traditionally served with kiri hodi, dhal curry, or coconut sambol.",
    ingredients: ["Rice flour", "Boiling water", "Salt", "Coconut milk", "Curry leaves"],
  },
  "Rice and Curry": {
    description: "A Sri Lankan everyday feast built around rice, several vegetable curries, dhal, sambol, and a meat or fish curry.",
    ingredients: ["Red rice", "Dhal", "Coconut milk", "Curry leaves", "Chili", "Turmeric", "Seasonal vegetables"],
  },
  Kiribath: {
    description: "Coconut milk rice cooked until creamy, pressed into squares, and served for celebrations and special occasions.",
    ingredients: ["White rice", "Coconut milk", "Water", "Salt"],
  },
  "Pol Sambol": {
    description: "A bright, spicy coconut relish made with chili, lime, and onion that lifts almost any Sri Lankan meal.",
    ingredients: ["Fresh coconut", "Red onion", "Dried chili", "Lime", "Salt", "Maldivian fish (optional)"],
  },
  "Fish Ambul Thiyal": {
    description: "Firm fish coated in goraka and spices, then cooked until dry, tangy, and deeply savory.",
    ingredients: ["Firm fish", "Goraka", "Black pepper", "Cinnamon", "Garlic", "Ginger", "Salt"],
  },
  "Dhal Curry": {
    description: "Creamy red lentils simmered with coconut milk, turmeric, aromatics, and a fragrant tempering of spices.",
    ingredients: ["Red lentils", "Coconut milk", "Onion", "Garlic", "Turmeric", "Curry leaves", "Cumin"],
  },
  Lamprais: {
    description: "A Dutch-influenced Sri Lankan parcel of rice, meat curry, frikkadels, sambol, and ash plantain baked in a banana leaf.",
    ingredients: ["Short-grain rice", "Meat curry", "Frikkadels", "Brinjal moju", "Seeni sambol", "Banana leaf"],
  },
  Watalappan: {
    description: "Silky steamed coconut custard scented with jaggery, cardamom, and nutmeg.",
    ingredients: ["Coconut milk", "Kithul jaggery", "Eggs", "Cardamom", "Nutmeg", "Cashews"],
  },
  Pittu: {
    description: "Steamed cylinders of rice flour and fresh coconut, usually enjoyed with coconut milk gravy or a rich curry.",
    ingredients: ["Rice flour", "Fresh coconut", "Warm water", "Salt", "Coconut milk gravy"],
  },
  "Pol Roti": {
    description: "A rustic coconut flatbread cooked on a hot pan and served with lunu miris, curry, or a spicy sambol.",
    ingredients: ["Wheat flour", "Fresh coconut", "Green chili", "Onion", "Water", "Salt"],
  },
};
