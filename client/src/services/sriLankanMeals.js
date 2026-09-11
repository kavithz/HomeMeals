// services/sriLankanMeals.js
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
    description:
      "A popular Sri Lankan street food made by stir-frying chopped godamba roti on a hot griddle with vegetables, egg, and a curry of your choice, such as chicken, beef, or seafood. It originated in the eastern towns of Batticaloa and Trincomalee and is often cooked to a distinctive rhythmic chopping sound.",
    ingredients: [
      "Godamba roti",
      "Onion",
      "Leeks",
      "Cabbage",
      "Carrot",
      "Egg",
      "Meat, chicken, or seafood (optional)",
      "Curry powder",
      "Chili",
    ],
   
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kottu_Roti.jpg",
  },
  Hoppers: {
    description:
      "Bowl-shaped pancakes made from a fermented batter of rice flour and coconut milk, cooked in a small curved pan until the edges turn thin and crispy while the center stays soft. Hoppers are a classic Sri Lankan breakfast or dinner, often served plain, with a cracked egg in the center, or with coconut sambol and curry.",
    ingredients: [
      "Rice flour",
      "Coconut milk",
      "Yeast",
      "Sugar or jaggery",
      "Salt",
      "Egg (for egg hoppers)",
    ],
    
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Egg_hoppers_sri_Lanka.jpg",
  },
  "String Hoppers": {
    description:
      "Known locally as idiyappam, these are delicate nests of steamed rice-flour noodles pressed through a mold. They're a staple Sri Lankan breakfast, usually served with dhal curry, coconut milk gravy (kiri hodi), or coconut sambol.",
    ingredients: ["Rice flour", "Hot water", "Salt"],
    
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Lanka-String_hoppers.jpg",
  },
  "Rice and Curry": {
    description:
      "The everyday Sri Lankan meal: a generous serving of rice paired with several small curries, such as a vegetable curry, a meat or fish curry, dhal, and a sambol or two. Portions are usually modest but bowls are refilled freely, and dishes lean on coconut milk and local spices for flavor.",
    ingredients: [
      "Rice",
      "Vegetable curry",
      "Meat or fish curry",
      "Dhal (lentil curry)",
      "Coconut sambol",
      "Papadum",
    ],
    
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Lankan_Rice_and_Curry.jpg",
  },
  Kiribath: {
    description:
      "Rice slow-cooked in coconut milk until thick and creamy, then set and cut into diamond-shaped pieces. Kiribath (literally 'milk rice') is prepared for New Year celebrations, birthdays, and other auspicious occasions, and is traditionally eaten with lunu miris (a spicy chili and onion paste).",
    ingredients: ["Rice", "Coconut milk", "Water", "Salt"],
   
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kiribath_(milk_rice).jpg",
  },
  "Pol Sambol": {
    description:
      "A bright, spicy coconut relish made by combining freshly grated coconut with chili, lime juice, onion, and salt, traditionally ground on a flat granite stone. It's one of the most common Sri Lankan condiments, served alongside rice, hoppers, string hoppers, and bread.",
    ingredients: [
      "Grated coconut",
      "Red onion or shallots",
      "Dried chili or chili powder",
      "Lime juice",
      "Salt",
      "Maldive fish (optional)",
    ],
    
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pol_Sambol.jpg",
  },
  "Fish Ambul Thiyal": {
    description:
      "A sour, dry fish curry from southern Sri Lanka, traditionally made with firm fish such as tuna cooked with goraka (a sour dried fruit), black pepper, and spices until the liquid reduces and the spice mix coats each piece. It was originally developed as a way to preserve fish without refrigeration and is best served with rice.",
    ingredients: [
      "Firm fish (tuna)",
      "Goraka (dried gamboge)",
      "Black pepper",
      "Garlic",
      "Ginger",
      "Curry leaves",
      "Cinnamon",
      "Salt",
    ],
    
    imageUrl: "https://placehold.co/600x400/png?text=Fish+Ambul+Thiyal",
  },
  "Dhal Curry": {
    description:
      "Also known as parippu curry, this is Sri Lanka's everyday lentil dish: red lentils simmered with coconut milk and turmeric, then finished with a tempering of mustard seeds, curry leaves, and dried chili fried in oil. It's eaten with nearly every rice and curry meal, hoppers, or string hoppers.",
    ingredients: [
      "Red lentils (masoor dal)",
      "Coconut milk",
      "Turmeric",
      "Onion",
      "Garlic",
      "Mustard seeds",
      "Curry leaves",
      "Dried or green chili",
    ],
    
    imageUrl: "https://placehold.co/600x400/png?text=Dhal+Curry",
  },
  Lamprais: {
    description:
      "A Dutch Burgher dish introduced during Dutch colonial rule, consisting of rice cooked in a meat-based stock, a mixed meat curry, frikkadels (meatballs), seeni sambol, and ash plantain or brinjal moju, all wrapped in a banana leaf and baked together so the flavors meld.",
    ingredients: [
      "Rice",
      "Mixed meat curry",
      "Frikkadels (meatballs)",
      "Seeni sambol",
      "Ash plantain or brinjal moju",
      "Banana leaf",
    ],
   
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lamprais_(Sri_Lankan_cuisine).jpg",
  },
  Watalappan: {
    description:
      "A rich steamed custard made from coconut milk, eggs, and jaggery, spiced with cardamom, nutmeg, and cloves, and often topped with roasted cashews. Watalappan is strongly associated with Sri Lanka's Muslim community and is a fixture of Eid celebrations and other special occasions.",
    ingredients: [
      "Coconut milk",
      "Eggs",
      "Kithul jaggery",
      "Cardamom",
      "Nutmeg",
      "Cloves",
      "Cashews",
    ],
    
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Watalappan-Sri_Lanka.jpg",
  },
  Pittu: {
    description:
      "Steamed cylinders of rice flour layered with fresh grated coconut inside a special mold, giving a crumbly, slightly nutty texture. Pittu is especially popular in Sri Lanka's Northern and Eastern provinces and is typically served with coconut milk gravy, curry, or banana.",
    ingredients: [
      "Rice flour",
      "Grated coconut",
      "Salt",
      "Coconut milk gravy (for serving)",
    ],
   
    imageUrl: "https://placehold.co/600x400/png?text=Pittu",
  },
  "Pol Roti": {
    description:
      "A rustic, unleavened flatbread made by kneading wheat flour (sometimes mixed with kurakkan flour) with fresh grated coconut, then cooking it on a hot griddle until golden and slightly charred. Pol roti is a common Sri Lankan breakfast or snack, usually eaten with lunu miris or a spicy sambol.",
    ingredients: [
      "Wheat flour",
      "Grated coconut",
      "Green chili",
      "Onion",
      "Salt",
      "Water",
    ],
    // PLACEHOLDER - no verified free-to-use photo found. Replace with a real photo.
    imageUrl: "https://placehold.co/600x400/png?text=Pol+Roti",
  },
};