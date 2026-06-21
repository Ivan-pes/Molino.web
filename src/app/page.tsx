"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Types
interface MenuItem {
  id: string;
  nameEn: string;
  nameEs: string;
  category: "cold_starters" | "hot_starters" | "salads" | "meats" | "sauces_sides" | "fish_seafood" | "paellas_risottos" | "kids_menu" | "desserts";
  descriptionEn: string;
  descriptionEs: string;
  price: number | string;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns: AddOn[];
}

interface AddOn {
  id: string;
  name: string;
  weight: string;
  price: number;
  type: "protein" | "veg" | "sweet";
}

interface DrinkItem {
  nameEn: string;
  nameEs: string;
  volume?: string;
  price: string;
  descriptionEn?: string;
  descriptionEs?: string;
}

interface DrinkCategory {
  categoryEn: string;
  categoryEs: string;
  items: DrinkItem[];
}

// Data
const MENU_ITEMS: MenuItem[] = [
  // Cold Starters (Entrantes Fríos)
  {
    id: "cf1",
    nameEn: "Normandy Oysters",
    nameEs: "Ostras de Normandía",
    category: "cold_starters",
    descriptionEn: "Normandy oysters served chilled (price and availability according to season/market).",
    descriptionEs: "Ostras de Normandía servidas frías (precio y disponibilidad según temporada/mercado).",
    price: "Market Price"
  },
  {
    id: "cf2",
    nameEn: "Iberian Ham Platter",
    nameEs: "Tabla de Jamón Ibérico",
    category: "cold_starters",
    descriptionEn: "Premium Iberian cured ham served with crispy rustic toast.",
    descriptionEs: "Tabla de jamón ibérico premium servido con tostada crujiente.",
    price: 26.00
  },
  {
    id: "cf3",
    nameEn: "Canary Island Cheese Selection",
    nameEs: "Surtido de Quesos Canarios",
    category: "cold_starters",
    descriptionEn: "Assorted local Canarian cheeses accompanied by mint, cactus, and flower honey, fig jam, and grissini.",
    descriptionEs: "Quesos canarios acompañados de miel de menta, cactus y flores, mermelada de higos y grissini.",
    price: 25.00
  },
  {
    id: "cf4",
    nameEn: "Sea Bass & Prawn Ceviche Duo",
    nameEs: "Ceviche Dúo de Gambón y Lubina",
    category: "cold_starters",
    descriptionEn: "Wild red prawns and fresh sea bass marinated in citrus juices and red pepper, served on a bed of sweet peach and passion fruit.",
    descriptionEs: "Gambón rojo y lubina fresca marinados en zumo de cítricos y pimiento rojo, sobre cama de melocotón y maracuyá.",
    price: 23.00
  },
  {
    id: "cf5",
    nameEn: "Beef Tenderloin Carpaccio",
    nameEs: "Carpaccio de Solomillo de Ternera",
    category: "cold_starters",
    descriptionEn: "Thinly sliced beef tenderloin topped with capers, fresh wild rocket, parmesan cheese mousse, and sun-dried tomatoes.",
    descriptionEs: "Finas láminas de solomillo de ternera con alcaparras, rúcula, mousse de parmesano y tomates secos.",
    price: 27.00
  },
  {
    id: "cf6",
    nameEn: "Roasted Pepper with Goat Cheese Mousse",
    nameEs: "Pimiento Asado con Mousse de Queso de Cabra",
    category: "cold_starters",
    descriptionEn: "Roasted sweet pepper filled with creamy cheese mousse, pistachio cream, and dehydrated cherry tomatoes.",
    descriptionEs: "Pimiento asado relleno de mousse de queso, crema de pistacho y tomates cherry deshidratados.",
    price: 20.00
  },
  {
    id: "cf7",
    nameEn: "Ripe Tomato Gazpacho",
    nameEs: "Gazpacho de Tomate Maduro",
    category: "cold_starters",
    descriptionEn: "Classic chilled soup of vine-ripened tomatoes, finished with fresh dill oil and served with homemade toast.",
    descriptionEs: "Sopa fría de tomates maduros, aceite de eneldo y tostada casera.",
    price: 12.00
  },

  // Hot Starters (Entrantes Calientes)
  {
    id: "cs1",
    nameEn: "Scallops over Tender Asparagus",
    nameEs: "Vieiras sobre Espárragos Tiernos",
    category: "hot_starters",
    descriptionEn: "Pan-seared sea scallops served over tender baby asparagus with fennel cream and Kamchatka red caviar.",
    descriptionEs: "Vieiras sobre espárragos tiernos con crema de hinojo y caviar rojo de Kamchatka.",
    price: 25.00
  },
  {
    id: "cs2",
    nameEn: "Garlic King Prawns Casserole",
    nameEs: "Cazuela de Langostinos al Ajillo",
    category: "hot_starters",
    descriptionEn: "Traditional Spanish sizzling king prawns cooked in garlic-infused olive oil and hot chili peppers.",
    descriptionEs: "Langostinos tradicionales cocinados en aceite de oliva con ajo y guindilla.",
    price: 21.00
  },
  {
    id: "cs3",
    nameEn: "Iberian Ham Croquettes",
    nameEs: "Croquetas de Jamón Ibérico",
    category: "hot_starters",
    descriptionEn: "Crispy homemade croquettes filled with rich Iberian ham, served with smooth house mayonnaise.",
    descriptionEs: "Croquetas crujientes de jamón ibérico con mayonesa casera.",
    price: 18.00
  },
  {
    id: "cs4",
    nameEn: "Padrón Peppers",
    nameEs: "Pimientos de Padrón",
    category: "hot_starters",
    descriptionEn: "Traditional Spanish blistered green peppers finished with premium flaky sea salt.",
    descriptionEs: "Pimientos verdes fritos terminados con escamas de sal marina.",
    price: 15.00
  },
  {
    id: "cs5",
    nameEn: "Seafood Assortment Trio",
    nameEs: "Surtido de Mariscos Trío",
    category: "hot_starters",
    descriptionEn: "Smoked octopus with romesco sauce and Canarian wrinkled potatoes; seared bluefin tuna on a bed of wakame seaweed with rich cashew sauce; house-cured salmon bruschetta with cream cheese and a slice of tender eel over warm rice.",
    descriptionEs: "Pulpo ahumado con salsa romesco y papas arrugadas; tataki de atún azul sobre wakame con salsa de anacardos; bruschetta de salmón curado con queso crema y anguila sobre arroz caliente.",
    price: 27.00
  },

  // Salads (Ensaladas)
  {
    id: "sl1",
    nameEn: "Classic Caesar Salad",
    nameEs: "Ensalada César Clásica",
    category: "salads",
    descriptionEn: "Romaine lettuce hearts, classic homemade Caesar dressing, crunchy croutons, and lightly salted cured salmon.",
    descriptionEs: "Corazones de lechuga romana, salsa César casera, croutons crujientes y salmón curado ligeramente salado.",
    price: 24.00
  },
  {
    id: "sl2",
    nameEn: "Warm Duck Confit Salad",
    nameEs: "Ensalada Templada de Confit de Pato",
    category: "salads",
    descriptionEn: "Warm shredded duck confit, fresh orange segments, wine-poached pear in Canarian sweet wine, toasted pine nuts, and tropical fruit dressing.",
    descriptionEs: "Confit de pato deshilachado, gajos de naranja, pera al vino dulce canario, piñones tostados y aderezo tropical.",
    price: 28.00
  },
  {
    id: "sl3",
    nameEn: "Beetroot Carpaccio & Goat Cheese",
    nameEs: "Carpaccio de Remolacha y Queso de Cabra",
    category: "salads",
    descriptionEn: "Thin beetroot carpaccio topped with crispy warm breaded goat cheese, wild blueberries, fresh rocket, and sesame-nut dressing.",
    descriptionEs: "Carpaccio de remolacha con queso de cabra crujiente, arándanos, rúcula y aderezo de sésamo y nueces.",
    price: 21.00
  },
  {
    id: "sl4",
    nameEn: "Baked Eggplant over Romesco",
    nameEs: "Berenjena al Horno sobre Romesco",
    category: "salads",
    descriptionEn: "Oven-baked eggplant served on a rich bed of romesco sauce, topped with fresh rocket, aromatic cherry tomatoes, and herb-infused olive oil.",
    descriptionEs: "Berenjena al horno sobre salsa romesco con rúcula, tomates cherry y aceite aromatizado.",
    price: 19.00
  },

  // Meats (Carnes)
  {
    id: "mt1",
    nameEn: "Slow-Stewed Lamb Shanks",
    nameEs: "Piernas de Cordero Estofadas",
    category: "meats",
    descriptionEn: "Slow-stewed lamb shanks served with homemade mashed potatoes and a garnish of roasted vegetables.",
    descriptionEs: "Piernas de cordero estofadas a fuego lento con puré de patatas casero y verduritas asadas.",
    price: 33.00
  },
  {
    id: "mt2",
    nameEn: "Duck Confit",
    nameEs: "Confit de Pato",
    category: "meats",
    descriptionEn: "Tender duck confit served with mandarin orange sauce, sweet potato purée, and mixed vegetables.",
    descriptionEs: "Confit de pato con salsa de mandarina, puré de batata y verduras mixtas.",
    price: 32.00
  },
  {
    id: "mt3",
    nameEn: "Duck Breast Magret",
    nameEs: "Magret de Pato",
    category: "meats",
    descriptionEn: "Duck breast magret served with cherry and Port wine reduction over mashed potatoes.",
    descriptionEs: "Magret de pato con salsa de cerezas y oporto, sobre puré de patatas.",
    price: 35.00
  },
  {
    id: "mt4",
    nameEn: "Braised Rabbit",
    nameEs: "Conejo Estofado",
    category: "meats",
    descriptionEn: "Stewed rabbit cooked with Catalan olives and ripe cherry tomatoes, accompanied by new potatoes, fresh rocket, and red onion salad.",
    descriptionEs: "Conejo estofado con aceitunas catalanas, tomates cherry, patatas jóvenes y ensalada de rúcula.",
    price: 25.00
  },
  {
    id: "mt5",
    nameEn: "Stuffed Chicken Leg",
    nameEs: "Muslo de Pollo Relleno",
    category: "meats",
    descriptionEn: "Chicken leg stuffed with honey-mustard marinated Asian mushrooms, served on a bed of mashed potatoes with a delicate cream sauce.",
    descriptionEs: "Muslo de pollo relleno de setas con miel y mostaza, puré de patatas y salsa cremosa.",
    price: 27.00
  },
  {
    id: "mt6",
    nameEn: "Grilled Beef Tenderloin",
    nameEs: "Solomillo de Ternera al Grill",
    category: "meats",
    descriptionEn: "Grilled beef tenderloin (choice of sauces and side dishes).",
    descriptionEs: "Solomillo de ternera al grill (salsas y guarniciones a elegir).",
    price: 38.00
  },
  {
    id: "mt7",
    nameEn: "Beef Ribeye Steak",
    nameEs: "Chuletón de Ternera",
    category: "meats",
    descriptionEn: "Beef ribeye steak (approx. 900–1600g). Price is per Kilogram. Includes choice of sauce.",
    descriptionEs: "Chuletón de ternera (900-1.600g aprox.). Precio por kg (salsa a elegir).",
    price: 64.00
  },
  {
    id: "mt8",
    nameEn: "T-Bone Steak",
    nameEs: "T-Bone",
    category: "meats",
    descriptionEn: "T-Bone steak (approx. 1000–1700g). Price is per Kilogram. Includes choice of sauce.",
    descriptionEs: "T-Bone (1.000-1.700g aprox.). Precio por kg (salsa a elegir).",
    price: 69.00
  },
  {
    id: "mt9",
    nameEn: "Chateaubriand (Min. 2 Pax)",
    nameEs: "Chateaubriand (Mín. 2 Pax)",
    category: "meats",
    descriptionEn: "Classic Chateaubriand (price is for two persons). Includes choice of sauce.",
    descriptionEs: "Chateaubriand clásico (precio para dos personas). Incluye salsa a elegir.",
    price: 81.00
  },
  {
    id: "mt10",
    nameEn: "Stewed Pork Ribs",
    nameEs: "Costillas de Cerdo Estofadas",
    category: "meats",
    descriptionEn: "Tender pork ribs braised in house BBQ sauce, served with french fries.",
    descriptionEs: "Costillas de cerdo estofadas con salsa barbacoa casera y patatas fritas.",
    price: 28.00
  },
  {
    id: "mt11",
    nameEn: "Beef Tenderloin Tips Casserole",
    nameEs: "Cazuela con Puntas de Solomillo",
    category: "meats",
    descriptionEn: "Rich casserole cooked with beef tenderloin tips and vegetables, accompanied by Canarian wrinkle potatoes.",
    descriptionEs: "Cazuela con puntas de solomillo y verduras, con patatas canarias arrugadas.",
    price: 34.00
  },
  {
    id: "mt12",
    nameEn: "Double Cured Beef Burger",
    nameEs: "Hamburguesa Doble de Ternera Curada",
    category: "meats",
    descriptionEn: "Double burger with cured beef, Canarian goat cheese, wild rocket, and red berry sauce, served with french fries.",
    descriptionEs: "Hamburguesa doble con ternera curada, queso de cabra canario, rúcula y salsa de frutos rojos con patatas fritas.",
    price: 28.00
  },

  // Sauces & Side Dishes (Salsas y guarniciones)
  {
    id: "ss1",
    nameEn: "Pepper Sauce",
    nameEs: "Salsa de Pimienta",
    category: "sauces_sides",
    descriptionEn: "Classic rich green pepper cream sauce.",
    descriptionEs: "Salsa cremosa de pimienta verde clásica.",
    price: 5.00
  },
  {
    id: "ss2",
    nameEn: "Wild Mushroom Sauce",
    nameEs: "Salsa de Setas Silvestres",
    category: "sauces_sides",
    descriptionEn: "Sautéed wild mushrooms cream reduction.",
    descriptionEs: "Reducción cremosa de setas silvestres salteadas.",
    price: 5.00
  },
  {
    id: "ss3",
    nameEn: "Parmesan Sauce",
    nameEs: "Salsa de Parmesano",
    category: "sauces_sides",
    descriptionEn: "Creamy aged parmesan sauce.",
    descriptionEs: "Salsa cremosa de queso parmesano curado.",
    price: 6.00
  },
  {
    id: "ss4",
    nameEn: "Orange Sauce",
    nameEs: "Salsa de Naranja",
    category: "sauces_sides",
    descriptionEn: "Sweet and tangy citrus reduction.",
    descriptionEs: "Reducción cítrica dulce y aromática.",
    price: 5.00
  },
  {
    id: "ss5",
    nameEn: "Saffron Sauce",
    nameEs: "Salsa de Azafrán",
    category: "sauces_sides",
    descriptionEn: "Delicate and aromatic saffron cream sauce.",
    descriptionEs: "Delicada y aromática salsa cremosa de azafrán.",
    price: 4.00
  },
  {
    id: "ss6",
    nameEn: "Steamed Rice",
    nameEs: "Arroz al Vapor",
    category: "sauces_sides",
    descriptionEn: "Perfectly steamed jasmine rice.",
    descriptionEs: "Arroz jazmín perfectamente cocido al vapor.",
    price: 4.20
  },
  {
    id: "ss7",
    nameEn: "French Fries",
    nameEs: "Patatas Fritas",
    category: "sauces_sides",
    descriptionEn: "Crispy golden french fries.",
    descriptionEs: "Patatas fritas doradas y crujientes.",
    price: 4.20
  },
  {
    id: "ss8",
    nameEn: "Canarian Wrinkled Potatoes",
    nameEs: "Papas Arrugadas Canarias",
    category: "sauces_sides",
    descriptionEn: "Traditional local Canarian papas arrugadas cooked in sea salt.",
    descriptionEs: "Papas arrugadas tradicionales hervidas con sal marina.",
    price: 4.20
  },
  {
    id: "ss9",
    nameEn: "Mashed Potatoes",
    nameEs: "Puré de Patatas",
    category: "sauces_sides",
    descriptionEn: "Creamy, smooth butter-whipped mashed potatoes.",
    descriptionEs: "Puré de patatas cremoso batido con mantequilla.",
    price: 4.20
  },
  {
    id: "ss10",
    nameEn: "Sautéed Baby Vegetables",
    nameEs: "Verduras Baby Salteadas",
    category: "sauces_sides",
    descriptionEn: "Seasoned pan-sautéed baby vegetables in olive oil.",
    descriptionEs: "Verduras baby salteadas en aceite de oliva y sazonadas.",
    price: 4.20
  },
  {
    id: "ss11",
    nameEn: "Bread & Butter (Per Person)",
    nameEs: "Pan y Mantequilla (Por Persona)",
    category: "sauces_sides",
    descriptionEn: "Warm rustic bread served with salted butter.",
    descriptionEs: "Pan rústico tibio servido con mantequilla con sal.",
    price: 7.00
  },
  {
    id: "ss12",
    nameEn: "Marinated Olives",
    nameEs: "Aceitunas Marinadas",
    category: "sauces_sides",
    descriptionEn: "House-marinated Spanish olives.",
    descriptionEs: "Aceitunas aliñadas marinadas al estilo de la casa.",
    price: 6.00
  },

  // Fish & Seafood (Pescados y mariscos)
  {
    id: "fs1",
    nameEn: "Smoked Octopus",
    nameEs: "Pulpo Ahumado",
    category: "fish_seafood",
    descriptionEn: "Smoked octopus served with roasted sweet pepper sauce, local Canarian wrinkle potatoes, and aromatic herb oil.",
    descriptionEs: "Pulpo ahumado con salsa de pimientos asados, papas canarias y aceite de hierbas aromáticas.",
    price: 30.00
  },
  {
    id: "fs2",
    nameEn: "Bluefin Tuna Tataki",
    nameEs: "Tataki de Atún Azul",
    category: "fish_seafood",
    descriptionEn: "Seared bluefin tuna tataki on a bed of wakame seaweed with roasted cashew sauce and black garlic cream.",
    descriptionEs: "Tataki de atún azul sobre alga wakame con salsa de anacardos tostados y crema de ajo negro.",
    price: 29.00
  },
  {
    id: "fs3",
    nameEn: "Wild Sea Bass Fillet",
    nameEs: "Filete de Lubina Salvaje",
    category: "fish_seafood",
    descriptionEn: "Fresh wild-caught sea bass fillet served with thin zucchini ribbons, roasted cauliflower purée, and pine nuts.",
    descriptionEs: "Filete de lubina salvaje recién pescada con lámina de calabacín sobre crema de coliflor asada y piñones.",
    price: 26.00
  },
  {
    id: "fs4",
    nameEn: "Matrimonio Duet",
    nameEs: "Matrimonio",
    category: "fish_seafood",
    descriptionEn: "Delicate pairing of sea bass roll with parmesan cream and light salmon wrap with asparagus and crispy ham, served with homemade mashed potatoes.",
    descriptionEs: "Matrimonio: rollito de lubina con crema de parmesano, salmón ligero con espárragos y un toque crujiente de jamón, servido con puré de patatas caseras.",
    price: 28.00
  },
  {
    id: "fs5",
    nameEn: "Salmon Fillet with Caviar",
    nameEs: "Filete de Salmón con Caviar",
    category: "fish_seafood",
    descriptionEn: "Salmon fillet served over tender asparagus and rice, finished with rich cured parmesan cheese sauce and red caviar.",
    descriptionEs: "Filete de salmón sobre espárragos tiernos y arroz, con salsa de queso parmesano curado y caviar rojo.",
    price: 36.00
  },

  // Paellas & Risottos (Nuestros arroces)
  {
    id: "pr1",
    nameEn: "Traditional El Molino Blanco Paella",
    nameEs: "Paella Estilo El Molino Blanco",
    category: "paellas_risottos",
    descriptionEn: "Authentic El Molino Blanco style paella cooked with rabbit, garrofó beans, and green beans. Price is per person, minimum of 2 people.",
    descriptionEs: "Paella tradicional con conejo, judías garrofón y habichuelas (precio por persona, mínimo 2 personas).",
    price: 30.00
  },
  {
    id: "pr2",
    nameEn: "Fish & Seafood Paella",
    nameEs: "Paella de Pescado y Mariscos",
    category: "paellas_risottos",
    descriptionEn: "Traditional Spanish seafood paella with fresh fish and mixed shellfish. Price is per person, minimum of 2 people.",
    descriptionEs: "Paella tradicional con pescado fresco y mariscos variados (precio por persona, mínimo 2 personas).",
    price: 35.00
  },
  {
    id: "pr3",
    nameEn: "Black Rice Cuttlefish Paella",
    nameEs: "Paella de Arroz Negro con Sepia",
    category: "paellas_risottos",
    descriptionEn: "Black squid ink paella cooked with tender cuttlefish, king prawns, and creamy garlic alioli. Price is per person, minimum of 2 people.",
    descriptionEs: "Arroz negro con sepia, langostinos y alioli cremoso (precio por persona, mínimo 2 personas).",
    price: 30.00
  },
  {
    id: "pr4",
    nameEn: "Garden Vegetable Paella",
    nameEs: "Paella de Verduras",
    category: "paellas_risottos",
    descriptionEn: "Healthy paella cooked with rich seasonal vegetables and green beans. Price is per person, minimum of 2 people.",
    descriptionEs: "Paella vegetariana con verduras de temporada y habichuelas (precio por persona, mínimo 2 personas).",
    price: 28.00
  },
  {
    id: "pr5",
    nameEn: "Seafood Black Risotto",
    nameEs: "Risotto Negro de Mariscos",
    category: "paellas_risottos",
    descriptionEn: "Rich and creamy black squid ink risotto loaded with fresh assorted seafood.",
    descriptionEs: "Risotto negro cremoso con tinta de calamar y mariscos frescos.",
    price: 30.00
  },
  {
    id: "pr6",
    nameEn: "Wild White Mushroom Risotto",
    nameEs: "Risotto de Setas Silvestres",
    category: "paellas_risottos",
    descriptionEn: "Creamy white forest mushroom risotto finished with crunchy walnuts and fragrant white truffle oil.",
    descriptionEs: "Risotto cremoso de setas del bosque con nueces y aceite de trufa blanca.",
    price: 23.00
  },

  // Kids Menu (Menu de niños)
  {
    id: "km1",
    nameEn: "Chicken Burger",
    nameEs: "Hamburguesa de Pollo",
    category: "kids_menu",
    descriptionEn: "Chicken burger served with cheese and fries.",
    descriptionEs: "Hamburguesa de pollo con queso y patatas fritas.",
    price: 12.00
  },
  {
    id: "km2",
    nameEn: "Creamy Bacon Pasta",
    nameEs: "Pasta Cremosa con Beicon",
    category: "kids_menu",
    descriptionEn: "Pasta cooked with cream sauce and bacon.",
    descriptionEs: "Pasta cocinada con salsa de nata y beicon.",
    price: 10.00
  },
  {
    id: "km3",
    nameEn: "Chicken Nuggets",
    nameEs: "Nuggets de Pollo",
    category: "kids_menu",
    descriptionEn: "Crispy chicken nuggets served with french fries.",
    descriptionEs: "Nuggets de pollo crujientes servidos con patatas fritas.",
    price: 11.00
  },
  {
    id: "km4",
    nameEn: "Fish Strips",
    nameEs: "Tiritas de Pescado",
    category: "kids_menu",
    descriptionEn: "Golden fish strips served with mixed vegetables and fries.",
    descriptionEs: "Tiritas de pescado empanadas con verduras y patatas fritas.",
    price: 11.00
  },

  // Desserts (Postres)
  {
    id: "ds1",
    nameEn: "Flambé Strawberries with Green Pepper",
    nameEs: "Fresas al Flambé con Pimienta Verde",
    category: "desserts",
    descriptionEn: "Sweet strawberries flambéed in green pepper. Price is per person, minimum of 2 people.",
    descriptionEs: "Fresas dulces flambeadas con pimienta verde (precio por persona, mínimo 2 personas).",
    price: 15.00
  },
  {
    id: "ds2",
    nameEn: "Crepes Suzette Flambé",
    nameEs: "Crepes Suzette al Flambé",
    category: "desserts",
    descriptionEn: "Classic French crepes Suzette flambéed. Price is per person, minimum of 2 people.",
    descriptionEs: "Crepes francesas clásicas Suzette flambeadas (precio por persona, mínimo 2 personas).",
    price: 14.00
  },
  {
    id: "ds3",
    nameEn: "Banana Flambé",
    nameEs: "Plátano al Flambé en Mesa",
    category: "desserts",
    descriptionEn: "Bananas flambéed at your table. Price is per person, minimum of 2 people.",
    descriptionEs: "Plátanos flambeados en mesa (precio por persona, mínimo 2 personas).",
    price: 12.00
  },
  {
    id: "ds4",
    nameEn: "Peach Flambé with Whisky",
    nameEs: "Melocotón al Flambé con Whisky",
    category: "desserts",
    descriptionEn: "Sweet peach flambéed with whisky. Price is per person, minimum of 2 people.",
    descriptionEs: "Melocotones flambeados con whisky (precio por persona, mínimo 2 personas).",
    price: 11.00
  },
  {
    id: "ds5",
    nameEn: "Pistachio Tiramisu",
    nameEs: "Tiramisú de Pistacho",
    category: "desserts",
    descriptionEn: "Traditional tiramisu layered with rich pistachio cream.",
    descriptionEs: "Tiramisú italiano tradicional con crema de pistacho.",
    price: 13.00
  },
  {
    id: "ds6",
    nameEn: "Orange & Cointreau Panna Cotta",
    nameEs: "Panna Cotta de Naranja y Cointreau",
    category: "desserts",
    descriptionEn: "Creamy panna cotta infused with orange and Cointreau liqueur, served with fresh seasonal fruit.",
    descriptionEs: "Panna cotta infusionada con naranja y Cointreau, servida con fruta de temporada.",
    price: 12.00
  },
  {
    id: "ds7",
    nameEn: "Basque Cheesecake",
    nameEs: "Tarta de Queso Vasca",
    category: "desserts",
    descriptionEn: "Baked Basque cheesecake with toasted hazelnuts, local Canarian banana, and Frangelico hazelnut liqueur.",
    descriptionEs: "Tarta vasca horneada con avellanas, plátano canario y licor Frangelico.",
    price: 14.00
  },
  {
    id: "ds8",
    nameEn: "Raspberry & White Chocolate Millefeuille",
    nameEs: "Milhojas de Frambuesa y Chocolate Blanco",
    category: "desserts",
    descriptionEn: "Crisp puff pastry layered with fresh raspberries, mascarpone, and white chocolate cream.",
    descriptionEs: "Hojaldre crujiente con frambuesas frescas, mascarpone y crema de chocolate blanco.",
    price: 13.00
  },
  {
    id: "ds9",
    nameEn: "Chocolate Coulant",
    nameEs: "Coulant de Chocolate",
    category: "desserts",
    descriptionEn: "Molten chocolate lava cake served with a scoop of vanilla ice cream.",
    descriptionEs: "Bizcocho fundente de chocolate servido con una bola de helado de vainilla.",
    price: 12.00
  },
  {
    id: "ds10",
    nameEn: "Three-Flavor Ice Cream",
    nameEs: "Helado de Tres Sabores",
    category: "desserts",
    descriptionEn: "Selection of three ice cream flavors served with fresh whipped cream.",
    descriptionEs: "Surtido de helados de tres sabores servido con nata montada fresca.",
    price: 10.00
  }
];

const ADD_ONS: AddOn[] = [];

const DRINKS_MENU: DrinkCategory[] = [
  {
    categoryEn: "Classics",
    categoryEs: "Clásicos",
    items: [
      {
        nameEn: "Amaretto Sour",
        nameEs: "Amaretto Sour",
        descriptionEn: "Amaretto, lemon juice, egg white, sugar",
        descriptionEs: "Amareto, zumo de limón, clara de huevo y azúcar",
        price: "11.00 €"
      },
      {
        nameEn: "Caipirinha",
        nameEs: "Caipirinha",
        descriptionEn: "Cachaça, lime, sugar",
        descriptionEs: "Cachaça, lima y azúcar",
        price: "10.00 €"
      },
      {
        nameEn: "Daiquiri",
        nameEs: "Daiquiri",
        descriptionEn: "White rum, lemon, sugar syrup",
        descriptionEs: "Ron blanco, limón y sirope de azúcar",
        price: "10.00 €"
      },
      {
        nameEn: "Long Island Ice Tea",
        nameEs: "Long Island Ice Tea",
        descriptionEn: "Gin, Rum, Tequila, Vodka, Triple Sec, lemon juice, sugar, Coca-Cola",
        descriptionEs: "Ginebra, Ron, Tequila, Vodka, Triple seco, zumo de limón, azúcar y Coca-Cola",
        price: "12.00 €"
      },
      {
        nameEn: "Margarita (Mango / Peach)",
        nameEs: "Margarita (Mango / Melocotón)",
        descriptionEn: "Tequila silver, triple sec, lime juice",
        descriptionEs: "Tequila silver, triple seco y zumo de lima",
        price: "12.00 €"
      },
      {
        nameEn: "Mojito (Classic / Strawberry)",
        nameEs: "Mojito (Clásico / Fresa)",
        descriptionEn: "White rum, lime juice, fresh mint, sugar, soda",
        descriptionEs: "Ron blanco, zumo de lima, hierba buena, azúcar y soda",
        price: "10.00 €"
      },
      {
        nameEn: "Pina Colada",
        nameEs: "Piña Colada",
        descriptionEn: "White rum, coconut liqueur, coconut cream, pineapple juice",
        descriptionEs: "Ron blanco, licor de coco, crema de coco, zumo de piña",
        price: "11.00 €"
      },
      {
        nameEn: "Clover Club",
        nameEs: "Clover Club",
        descriptionEn: "Gin, dry vermouth, raspberry syrup, lemon, egg white",
        descriptionEs: "Ginebra, vermouth seco, sirope frambuesa, limón, clara de huevo",
        price: "11.00 €"
      },
      {
        nameEn: "Mai Tai",
        nameEs: "Mai Tai",
        descriptionEn: "White rum, Cointreau, lemon, almond syrup, sugar syrup",
        descriptionEs: "Ron blanco, Cointreau, limón, sirope almendras y sirope de azúcar",
        price: "11.00 €"
      },
      {
        nameEn: "Passion Star Martini",
        nameEs: "Passion Star Martini",
        descriptionEn: "Vodka, passion fruit liqueur, passion fruit puree, lemon, vanilla syrup, sparkling shot",
        descriptionEs: "Vodka, licor maracuyá, puré de maracuya, limón, sirope vainilla y chupito espumoso",
        price: "11.00 €"
      },
      {
        nameEn: "Whiskey Sour",
        nameEs: "Whiskey Sour",
        descriptionEn: "Whiskey, lemon juice, egg white, sugar syrup",
        descriptionEs: "Whiskey, zumo de limón, clara de huevo y sirope de azúcar",
        price: "11.00 €"
      },
      {
        nameEn: "Brandy Alexander",
        nameEs: "Brandy Alexander",
        descriptionEn: "Brandy, Baileys, cacao liqueur, cream",
        descriptionEs: "Brandy, Baileys, licor de cacao, nata",
        price: "12.50 €"
      }
    ]
  },
  {
    categoryEn: "Shots",
    categoryEs: "Chupitos",
    items: [
      {
        nameEn: "Tunika (Shot)",
        nameEs: "Tunika (Chupito)",
        descriptionEn: "Sambuca, dash of Tabasco, white Tequila",
        descriptionEs: "Sambuca, un toque de Tabasco, Tequila blanco",
        price: "8.00 €"
      }
    ]
  },
  {
    categoryEn: "Aperitifs",
    categoryEs: "Aperitivos",
    items: [
      {
        nameEn: "Aperol Spritz",
        nameEs: "Aperol Spritz",
        descriptionEn: "Cava, Aperol, soda",
        descriptionEs: "Cava, Aperol, soda",
        price: "12.00 €"
      },
      {
        nameEn: "Bellini",
        nameEs: "Bellini",
        descriptionEn: "Cava, Archers, peach puree",
        descriptionEs: "Cava, Archers, puré de melocotón",
        price: "10.00 €"
      },
      {
        nameEn: "Dry Martini",
        nameEs: "Dry Martini",
        descriptionEn: "Gin, dry Martini, lemon peel or olives",
        descriptionEs: "Ginebra, Martini seco, cáscara de limón o aceitunas",
        price: "11.00 €"
      },
      {
        nameEn: "Mimosa",
        nameEs: "Mimosa",
        descriptionEn: "Cava, orange juice",
        descriptionEs: "Cava, Zumo de naranja",
        price: "9.00 €"
      },
      {
        nameEn: "Bloody Mary",
        nameEs: "Bloody Mary",
        descriptionEn: "Vodka, tomato juice, lemon juice, Worcestershire sauce, Tabasco, salt & pepper",
        descriptionEs: "Vodka, zumo de tomate, zumo de limón, salsa Worcestershire, Tabasco, sal y pimienta",
        price: "11.00 €"
      },
      {
        nameEn: "Bramble",
        nameEs: "Bramble",
        descriptionEn: "Gin, blackberry liqueur, lemon juice, sugar",
        descriptionEs: "Ginebra, licor de moras, zumo de limon y azúcar",
        price: "12.00 €"
      },
      {
        nameEn: "Cosmopolitan",
        nameEs: "Cosmopolitan",
        descriptionEn: "Vodka, triple sec, lemon juice, cranberry juice",
        descriptionEs: "Vodka, triple seco, zumo de limón y zumo de arándanos",
        price: "12.00 €"
      },
      {
        nameEn: "Negroni",
        nameEs: "Negroni",
        descriptionEn: "Gin, Campari, Martini Rosso",
        descriptionEs: "Ginebra, campari y martini Rosso",
        price: "12.00 €"
      },
      {
        nameEn: "Espresso Martini",
        nameEs: "Espresso Martini",
        descriptionEn: "Vodka, coffee liqueur, espresso, sugar",
        descriptionEs: "Vodka, licor de café, café espresso y azúcar",
        price: "11.00 €"
      },
      {
        nameEn: "French Martini",
        nameEs: "French Martini",
        descriptionEn: "Smirnoff Vodka, raspberry liqueur, pineapple juice",
        descriptionEs: "Smirnoff Vodka, licor de frambuesa, zumo de piña",
        price: "11.00 €"
      }
    ]
  },
  {
    categoryEn: "Non-alcoholic Cocktails",
    categoryEs: "Cócteles sin Alcohol",
    items: [
      {
        nameEn: "Piña Colada (Non-alcoholic)",
        nameEs: "Piña Colada (Sin Alcohol)",
        descriptionEn: "Pineapple juice, coconut cream, sugar",
        descriptionEs: "Zumo de piña, crema de coco, azúcar",
        price: "8.00 €"
      },
      {
        nameEn: "San Francisco",
        nameEs: "San Francisco",
        descriptionEn: "Orange juice, pineapple juice, grenadine",
        descriptionEs: "Zumo naranja, zumo piña y granadina",
        price: "7.00 €"
      },
      {
        nameEn: "Mojito (Non-alcoholic)",
        nameEs: "Mojito (Sin Alcohol)",
        descriptionEn: "Lime, sugar, fresh mint, soda",
        descriptionEs: "Lima, azúcar, hierba buena y soda",
        price: "7.00 €"
      },
      {
        nameEn: "Passion Fruit",
        nameEs: "Fruta de la Pasión",
        descriptionEn: "Pineapple juice, passion fruit, lemon",
        descriptionEs: "Zumo de piña, Fruta de la pasion y limón",
        price: "8.00 €"
      }
    ]
  },
  {
    categoryEn: "Digestifs",
    categoryEs: "Digestivos",
    items: [
      {
        nameEn: "Black Russian",
        nameEs: "Black Russian",
        descriptionEn: "Vodka, coffee liqueur",
        descriptionEs: "Vodka y licor de café",
        price: "11.00 €"
      },
      {
        nameEn: "White Russian",
        nameEs: "White Russian",
        descriptionEn: "Vodka, coffee liqueur, cream",
        descriptionEs: "Vodka, licor de café y crema nata",
        price: "11.00 €"
      },
      {
        nameEn: "Long Black Russian",
        nameEs: "Long Black Russian",
        descriptionEn: "Smirnoff Vodka, coffee liqueur, filled with Coca-Cola",
        descriptionEs: "Smirnoff, Kahlua y Coca Cola",
        price: "12.00 €"
      }
    ]
  }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    navPhilosophy: "Philosophy",
    navMenu: "Menu",
    navBarCard: "Bar Card",
    navFindUs: "Find Us",
    navBookTable: "Book Table",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Gallery",
    loaderArtisanalCuisine: "Artisanal Cuisine",
    heroLiveMusic: "Live Music Every Night",
    heroTitle: "El Molino Blanco",
    heroTagline: "Cuisine that makes you want to return tomorrow",
    storyHeader: "01 / Our Story",
    storyTitle: "A place with a soul and a story",
    storyParagraph1: "EL MOLINO BLANCO is a place with a soul and a story, where time slows down and every evening carries a sense of occasion.",
    storyParagraph2: "Located in the south of Tenerife, the restaurant carefully preserves the spirit of classic hospitality, blending decades of tradition with elegant contemporary touches.",
    storyParagraph3: "Here, the cuisine is a natural extension of the atmosphere: soft lighting, live music, a charming courtyard, and the aromas of freshly prepared dishes create a feeling of celebration that is both familiar and unforgettable.",
    storyQuote: "EL MOLINO BLANCO is not just a dinner — it is an encounter with history, flavour, beautiful famous songs performed daily and the warm spirit of the island's south.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Space & Events",
    eventsTitle: "Legendary since the 1990s",
    eventsSubtitle: "Celebrations & Spaces",
    eventsAboutTitle: "About the Restaurant",
    eventsHoursOpen: "Open every day: 17:00 - 00:00",
    eventsMusicHours: "Live music daily: 19:30 - 23:30",
    eventsCuisine: "Mediterranean & Spanish Cuisine",
    eventsPerfectForTitle: "Perfect For",
    eventsPerfectRomantic: "Romantic Dinner",
    eventsPerfectFamily: "Family Gathering",
    eventsPerfectWeddings: "Wedding Celebrations",
    eventsPerfectBanquets: "Banquets & Celebrations",
    eventsPerfectCorporate: "Corporate Events",
    eventsSpaceTitle: "Space & Capacity",
    eventsSpaceInside: "Indoor seating near live music",
    eventsSpaceOutside: "Charming outdoor garden terrace",
    eventsSpaceCapacity: "Maximum capacity: 250 guests",
    pillarHonestTitle: "Honest Ingredients",
    pillarHonestDesc: "Cured in-house. Seared on real butter. Sourced with integrity.",
    pillarMusicTitle: "Live Music",
    pillarMusicDesc: "Vibrant acoustic performances accompany your dinner every single night.",
    pillarReturnTitle: "Return Tomorrow",
    pillarReturnDesc: "If we wouldn't come back, we change it.",
    menuHeader: "03 / Culinary Card",
    menuTitle: "The Menu",
    allergyNoticeTitle: "Allergy Notice: Please inform our staff if you have any food allergies or intolerances.",
    allergyNoticeAllergens: "Allergens: Gluten · Lupins (Altramuces) · Celery (Apio) · Crustaceans (Crustáceos) · Dairy (Lácteos) · Sesame (Sésamo) · Molluscs (Moluscos) · Mustard (Mostaza) · Nuts (Nueces) · Eggs (Huevos) · Fish (Pescado) · Soy (Soja) · Peanuts (Cacahuetes) · Sulphur Dioxide",
    barHeader: "04 / Bar Card",
    barTitle: "Drinks",
    galleryHeader: "05 / Gallery",
    galleryTitle: "Sanctuary Moments",
    gallerySubtitle: "Atmosphere & Venue",
    helloHeader: "06 / Atmosphere & Locations",
    helloTitle: "Say Hello",
    addressTitle: "Address",
    hoursTitle: "Hours & Entertainment",
    hoursDesc: "Daily from 5:00 PM to Midnight",
    hoursKitchenNote: "Kitchen closes at 11:30 PM",
    helloLiveMusicBadge: "Live Music Every Night",
    phoneTitle: "Phone",
    bookYourSeat: "Book Your Table",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Tenerife, Spain",
    cartTitle: "Your Selection",
    cartSubTitle: "El Molino Blanco Order Card",
    cartEmpty: "No delicious decisions made yet.",
    cartViewMenu: "View Restaurant Menu",
    cartSubtotal: "Subtotal",
    cartNotice: "VAT and service charges calculated at table. Please present this order to our hosts upon arrival, or click below to lock in in-house ordering.",
    cartSendOrder: "Send Order to Kitchen",
    cartRemove: "Remove",
    reserveLockTitle: "Lock a Table",
    reserveLockSubTitle: "Reserve your deliberate, slow morning",
    reserveFullName: "Your Full Name",
    reserveDate: "Date",
    reserveTime: "Time",
    reserveGuests: "Guests Quantity",
    reserveGuestsOption: "Persons",
    reserveGuestsSingle: "1 Person",
    reserveGuestsMultiple: "Persons",
    reserveNote: "Note: We preserve reservations for precisely 15 minutes past the slot. For larger parties exceeding 8 guests, please reach our hosts directly at +34 620 770 072.",
    reserveConfirmButton: "Confirm Table Reservation",
    reserveSuccessSecured: "Seat Secured",
    reserveSuccessExpecting: "We are expecting you, ",
    reserveSuccessDate: "Date",
    reserveSuccessTime: "Time",
    reserveSuccessGuests: "Guests",
    reserveSuccessGuestsUnit: "persons",
    reserveSuccessCode: "Reservation Code",
    reserveSuccessSmsNotice: "A confirmation SMS has been dispatched. Please keep this screen open or capture a screen grab for presenting to our host upon arrival.",
    reserveSuccessReturn: "Return to Site",
    cat_cold_starters: "Cold Starters",
    cat_hot_starters: "Hot Starters",
    cat_salads: "Salads",
    cat_meats: "Meats",
    cat_sauces_sides: "Sides & Sauces",
    cat_fish_seafood: "Fish & Seafood",
    cat_paellas_risottos: "Paellas & Risottos",
    cat_kids_menu: "Kids Menu",
    cat_desserts: "Desserts",
    drink_tab_classics: "Classics & Shots",
    drink_tab_aperitifs_digestifs: "Aperitifs & Digestifs",
    drink_tab_non_alcoholic: "Non-alcoholic",
    drink_cat_classics: "Classics",
    drink_cat_aperitifs: "Aperitifs",
    drink_cat_non_alcoholic_cocktails: "Non-alcoholic Cocktails",
    drink_cat_digestifs: "Digestifs",
    drink_cat_shots: "Shots"
  },
  es: {
    navPhilosophy: "Filosofía",
    navMenu: "La Carta",
    navBarCard: "Coctelería",
    navFindUs: "Dónde Estamos",
    navBookTable: "Reservar Mesa",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Galería",
    loaderArtisanalCuisine: "Cocina Artesanal",
    heroLiveMusic: "Música en Vivo Todas las Noches",
    heroTitle: "El Molino Blanco",
    heroTagline: "Cocina que te hace querer volver mañana",
    storyHeader: "01 / Nuestra Historia",
    storyTitle: "Un lugar con alma e historia",
    storyParagraph1: "EL MOLINO BLANCO es un lugar con alma e historia, donde el tiempo se ralentiza y cada velada adquiere un sentido especial.",
    storyParagraph2: "Situado en el sur de Tenerife, el restaurante conserva cuidadosamente el espíritu de la hospitalidad clásica, fusionando décadas de tradición con elegantes toques contemporáneos.",
    storyParagraph3: "Aquí, la gastronomía es una extensión natural del ambiente: la luz tenue, la música en vivo, un patio encantador y los aromas de los platos recién preparados crean una sensación de celebración tan familiar como inolvidable.",
    storyQuote: "EL MOLINO BLANCO no es solo una cena: es un encuentro con la historia, el sabor, hermosas canciones famosas interpretadas a diario y el cálido espíritu del sur de la isla.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Espacios y Eventos",
    eventsTitle: "Legendario desde los años 90",
    eventsSubtitle: "Celebraciones y Espacios",
    eventsAboutTitle: "Sobre el Restaurante",
    eventsHoursOpen: "Abierto todos los días: 17:00 - 00:00",
    eventsMusicHours: "Música en vivo a diario: 19:30 - 23:30",
    eventsCuisine: "Cocina Mediterránea y Española",
    eventsPerfectForTitle: "Ideal Para",
    eventsPerfectRomantic: "Cena Romántica",
    eventsPerfectFamily: "Reunión Familiar",
    eventsPerfectWeddings: "Bodas y Celebraciones",
    eventsPerfectBanquets: "Banquetes y Celebraciones",
    eventsPerfectCorporate: "Eventos Corporativos",
    eventsSpaceTitle: "Espacio y Aforo",
    eventsSpaceInside: "Salón interior junto a la música en vivo",
    eventsSpaceOutside: "Terraza jardín al aire libre",
    eventsSpaceCapacity: "Aforo máximo: 250 personas",
    pillarHonestTitle: "Ingredientes Honestos",
    pillarHonestDesc: "Curados en casa. Sellados con mantequilla real. Obtenidos con integridad.",
    pillarMusicTitle: "Música en Vivo",
    pillarMusicDesc: "Vibrantes actuaciones acústicas acompañan tu cena cada noche.",
    pillarReturnTitle: "Volver Mañana",
    pillarReturnDesc: "Si nosotros mismos no volveríamos, lo cambiamos.",
    menuHeader: "03 / Carta Culinaria",
    menuTitle: "La Carta",
    allergyNoticeTitle: "Aviso de Alergias: Por favor, informe a nuestro personal si tiene alguna alergia o intolerancia alimentaria.",
    allergyNoticeAllergens: "Alérgenos: Gluten · Altramuces · Apio · Crustáceos · Lácteos · Sésamo · Moluscos · Mostaza · Nueces · Huevos · Pescado · Soja · Cacahuetes · Dióxido de Azufre",
    barHeader: "04 / Carta de Bebidas",
    barTitle: "Bebidas",
    galleryHeader: "05 / Galería",
    galleryTitle: "Momentos del Santuario",
    gallerySubtitle: "El Ambiente y el Local",
    helloHeader: "06 / Ambiente y Ubicación",
    helloTitle: "Contacto",
    addressTitle: "Dirección",
    hoursTitle: "Horario y Entretenimiento",
    hoursDesc: "Todos los días de 17:00 a Medianoche",
    hoursKitchenNote: "La cocina cierra a las 23:30",
    helloLiveMusicBadge: "Música en Vivo Todas las Noches",
    phoneTitle: "Teléfono",
    bookYourSeat: "Reserva tu Mesa",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Tenerife, España",
    cartTitle: "Su Selección",
    cartSubTitle: "Tarjeta de Pedido El Molino Blanco",
    cartEmpty: "Aún no se han tomado decisiones deliciosas.",
    cartViewMenu: "Ver la Carta del Restaurante",
    cartSubtotal: "Subtotal",
    cartNotice: "El IVA y los cargos de servicio se calculan en la mesa. Por favor, presente este pedido a nuestro personal a su llegada, o haga clic a continuación para registrarlo.",
    cartSendOrder: "Enviar Pedido a Cocina",
    cartRemove: "Eliminar",
    reserveLockTitle: "Reservar una Mesa",
    reserveLockSubTitle: "Asegure su velada en nuestro rincón especial",
    reserveFullName: "Su Nombre Completo",
    reserveDate: "Fecha",
    reserveTime: "Hora",
    reserveGuests: "Número de Personas",
    reserveGuestsOption: "Personas",
    reserveGuestsSingle: "1 Persona",
    reserveGuestsMultiple: "Personas",
    reserveNote: "Nota: Mantenemos las reservas durante un máximo de 15 minutos de cortesía. Para grupos de más de 8 personas, por favor contacte directamente por teléfono al +34 620 770 072.",
    reserveConfirmButton: "Confirmar Reserva de Mesa",
    reserveSuccessSecured: "Reserva Confirmada",
    reserveSuccessExpecting: "Le estaremos esperando, ",
    reserveSuccessDate: "Fecha",
    reserveSuccessTime: "Hora",
    reserveSuccessGuests: "Personas",
    reserveSuccessGuestsUnit: "personas",
    reserveSuccessCode: "Código de Reserva",
    reserveSuccessSmsNotice: "Se ha enviado un SMS de confirmación. Por favor, conserve esta pantalla o haga una captura para mostrarla a nuestro personal a su llegada.",
    reserveSuccessReturn: "Regresar al sitio",
    cat_cold_starters: "Entrantes Fríos",
    cat_hot_starters: "Entrantes Calientes",
    cat_salads: "Ensaladas",
    cat_meats: "Carnes",
    cat_sauces_sides: "Guarniciones y Salsas",
    cat_fish_seafood: "Pescados y Mariscos",
    cat_paellas_risottos: "Nuestros Arroces",
    cat_kids_menu: "Menú de Niños",
    cat_desserts: "Postres",
    drink_tab_classics: "Clásicos y Chupitos",
    drink_tab_aperitifs_digestifs: "Aperitivos y Digestivos",
    drink_tab_non_alcoholic: "Sin Alcohol",
    drink_cat_classics: "Clásicos",
    drink_cat_aperitifs: "Aperitivos",
    drink_cat_non_alcoholic_cocktails: "Cócteles Sin Alcohol",
    drink_cat_digestifs: "Digestivos",
    drink_cat_shots: "Chupitos"
  },
  ru: {
    navPhilosophy: "Философия",
    navMenu: "Меню",
    navBarCard: "Барная карта",
    navFindUs: "Найдите нас",
    navBookTable: "Забронировать",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Галерея",
    loaderArtisanalCuisine: "Ремесленная кухня",
    heroLiveMusic: "Живая музыка каждый вечер",
    heroTitle: "El Molino Blanco",
    heroTagline: "Кухня, к которой хочется вернуться завтра",
    storyHeader: "01 / Наша история",
    storyTitle: "Место с душой и историей",
    storyParagraph1: "EL MOLINO BLANCO — это место с душой и историей, где время замедляется, а каждый вечер наполнен ощущением важности.",
    storyParagraph2: "Расположенный на юге Тенерифе ресторан бережно сохраняет дух классического гостеприимства, сочетая десятилетия традиций с элегантными современными деталями.",
    storyParagraph3: "Здесь кухня является естественным продолжением атмосферы: мягкое освещение, живая музыка, очаровательный дворик и ароматы свежеприготовленных блюд создают ощущение праздника одновременно знакомого и незабываемого.",
    storyQuote: "EL MOLINO BLANCO – это не просто ужин, это встреча с историей, вкусом, прекрасными знаменитыми песнями, исполняемыми ежедневно, и теплым духом юга острова.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Пространство и мероприятия",
    eventsTitle: "Легендарный с 1990-х годов",
    eventsSubtitle: "Торжества и пространства",
    eventsAboutTitle: "О ресторане",
    eventsHoursOpen: "Открыт каждый день: 17:00 - 00:00.",
    eventsMusicHours: "Живая музыка ежедневно: 19:30 – 23:30.",
    eventsCuisine: "Средиземноморская и испанская кухня",
    eventsPerfectForTitle: "Идеально подходит для",
    eventsPerfectRomantic: "Романтический ужин",
    eventsPerfectFamily: "Семейный сбор",
    eventsPerfectWeddings: "Свадебные торжества",
    eventsPerfectBanquets: "Банкеты и торжества",
    eventsPerfectCorporate: "Корпоративные мероприятия",
    eventsSpaceTitle: "Пространство и вместимость",
    eventsSpaceInside: "Крытый уголок рядом с живой музыкой",
    eventsSpaceOutside: "Очаровательная открытая садовая терраса",
    eventsSpaceCapacity: "Максимальная вместимость: 250 гостей.",
    pillarHonestTitle: "Натуральные ингредиенты",
    pillarHonestDesc: "Мы используем только свежие и качественные продукты, чтобы каждый вкус оставался по-настоящему естественным.",
    pillarMusicTitle: "Живая музыка",
    pillarMusicDesc: "Каждый вечер для гостей звучит живая акустическая музыка, создавая особую атмосферу во время ужина.",
    pillarReturnTitle: "Наша цель — чтобы вам захотелось вернуться снова.",
    pillarReturnDesc: "Мы стремимся сделать ваш опыт настолько приятным, чтобы вы захотели вернуться.",
    menuHeader: "03 / Кулинарная карта",
    menuTitle: "Меню",
    allergyNoticeTitle: "Уведомление об аллергии: Пожалуйста, сообщите нашим сотрудникам, если у вас есть пищевая аллергия или непереносимость.",
    allergyNoticeAllergens: "Аллергены: Глютен · Люпин (Altramuces) · Сельдерей (Apio) · Ракообразные (Crustáceos) · Молочные продукты (Lácteos) · Кунжут (Sésamo) · Моллюски (Moluscos) · Горчица (Mostaza) · Орехи (Nueces) · Яйца (Huevos) · Рыба (Пескадо) · Соя (Soja) · Арахис (Какауэтес) · Диоксид серы",
    barHeader: "04 / Вкладка Бар",
    barTitle: "Напитки",
    galleryHeader: "05 / Галерея",
    galleryTitle: "Моменты нашего уголка",
    gallerySubtitle: "Атмосфера и заведение",
    helloHeader: "06 / Атмосфера и локации",
    helloTitle: "Наш адрес",
    addressTitle: "Адрес",
    hoursTitle: "Часы работы и развлечения",
    hoursDesc: "Ежедневно с 17:00 до полуночи",
    hoursKitchenNote: "Кухня закрывается в 23:30.",
    helloLiveMusicBadge: "Живая музыка каждый вечер",
    phoneTitle: "Телефон",
    bookYourSeat: "Забронируйте столик",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Тенерифе, Испания",
    cartTitle: "Ваш выбор",
    cartSubTitle: "Карточка заказа El Molino Blanco",
    cartEmpty: "Никаких вкусных решений пока не принято.",
    cartViewMenu: "Посмотреть меню ресторана",
    cartSubtotal: "Итого",
    cartNotice: "НДС и плата за обслуживание рассчитываются по табл. Пожалуйста, предъявите этот заказ нашим хозяевам по прибытии или нажмите кнопку ниже, чтобы зафиксировать заказ на месте.",
    cartSendOrder: "Отправить заказ на кухню",
    cartRemove: "Удалить",
    reserveLockTitle: "Заблокировать таблицу",
    reserveLockSubTitle: "Зарезервируйте свое сознательное, медленное утро",
    reserveFullName: "Ваше полное имя",
    reserveDate: "Дата",
    reserveTime: "Время",
    reserveGuests: "Количество гостей",
    reserveGuestsOption: "Персоны",
    reserveGuestsSingle: "1 человек",
    reserveGuestsMultiple: "Персоны",
    reserveNote: "Примечание. Бронирование сохраняется ровно на 15 минут после окончания слота. Для больших резервов, превышающих 8 гостей, свяжитесь с нашими хозяевами напрямую по телефону +34 620 770 072.",
    reserveConfirmButton: "Подтвердить бронирование столика",
    reserveSuccessSecured: "Место закреплено",
    reserveSuccessExpecting: "Мы ждём тебя,",
    reserveSuccessDate: "Дата",
    reserveSuccessTime: "Время",
    reserveSuccessGuests: "Гости",
    reserveSuccessGuestsUnit: "люди",
    reserveSuccessCode: "Код бронирования",
    reserveSuccessSmsNotice: "Было отправлено SMS-подтверждение. Пожалуйста, оставьте этот экран открытым или сделайте снимок экрана, чтобы показать его хозяину по прибытии.",
    reserveSuccessReturn: "Вернуться на сайт",
    cat_cold_starters: "Холодные закуски",
    cat_hot_starters: "Горячие закуски",
    cat_salads: "Салаты",
    cat_meats: "Мясо",
    cat_sauces_sides: "Гарниры и соусы",
    cat_fish_seafood: "Рыба и морепродукты",
    cat_paellas_risottos: "Паэлья и ризотто",
    cat_kids_menu: "Детское меню",
    cat_desserts: "Десерты",
    drink_tab_classics: "Классика и шоты",
    drink_tab_aperitifs_digestifs: "Аперитивы и дижестивы",
    drink_tab_non_alcoholic: "Безалкогольный",
    drink_cat_classics: "Классика",
    drink_cat_aperitifs: "Аперитивы",
    drink_cat_non_alcoholic_cocktails: "Безалкогольные коктейли",
    drink_cat_digestifs: "Дижестивы",
    drink_cat_shots: "Шоты"
  },
  de: {
    navPhilosophy: "Philosophie",
    navMenu: "Menü",
    navBarCard: "Barkarte",
    navFindUs: "Finden Sie uns",
    navBookTable: "Tisch reservieren",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Galerie",
    loaderArtisanalCuisine: "Handwerkliche Küche",
    heroLiveMusic: "Jeden Abend Live-Musik",
    heroTitle: "El Molino Blanco",
    heroTagline: "Eine Küche, die Lust darauf macht, morgen wiederzukommen",
    storyHeader: "01 / Unsere Geschichte",
    storyTitle: "Ein Ort mit einer Seele und einer Geschichte",
    storyParagraph1: "EL MOLINO BLANCO ist ein Ort mit einer Seele und einer Geschichte, an dem die Zeit vergeht und jeder Abend ein besonderes Erlebnis mit sich bringt.",
    storyParagraph2: "Das im Süden Teneriffas gelegene Restaurant bewahrt sorgfältig den Geist der klassischen Gastfreundschaft und verbindet jahrzehntelange Tradition mit eleganten modernen Akzenten.",
    storyParagraph3: "Hier ist die Küche eine natürliche Erweiterung der Atmosphäre: Sanftes Licht, Live-Musik, ein bezaubernder Innenhof und die Düfte frisch zubereiteter Gerichte sorgen für ein festliches Gefühl, das sowohl vertraut als auch unvergesslich ist.",
    storyQuote: "EL MOLINO BLANCO ist nicht nur ein Abendessen – es ist eine Begegnung mit Geschichte, Geschmack, wunderschönen, täglich aufgeführten berühmten Liedern und dem warmen Geist des Südens der Insel.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Raum & Events",
    eventsTitle: "Legendär seit den 1990er Jahren",
    eventsSubtitle: "Feiern und Räume",
    eventsAboutTitle: "Über das Restaurant",
    eventsHoursOpen: "Täglich geöffnet: 17:00 - 00:00 Uhr",
    eventsMusicHours: "Täglich Live-Musik: 19:30 - 23:30 Uhr",
    eventsCuisine: "Mediterrane und spanische Küche",
    eventsPerfectForTitle: "Perfekt für",
    eventsPerfectRomantic: "Romantisches Abendessen",
    eventsPerfectFamily: "Familientreffen",
    eventsPerfectWeddings: "Hochzeitsfeiern",
    eventsPerfectBanquets: "Bankette und Feiern",
    eventsPerfectCorporate: "Firmenveranstaltungen",
    eventsSpaceTitle: "Platz und Kapazität",
    eventsSpaceInside: "Innensitzplätze in der Nähe von Live-Musik",
    eventsSpaceOutside: "Charmante Gartenterrasse im Freien",
    eventsSpaceCapacity: "Maximale Kapazität: 250 Gäste",
    pillarHonestTitle: "Ehrliche Zutaten",
    pillarHonestDesc: "Im eigenen Haus ausgehärtet. Auf echter Butter angebraten. Mit Integrität bezogen.",
    pillarMusicTitle: "Live-Musik",
    pillarMusicDesc: "Lebendige akustische Darbietungen begleiten Ihr Abendessen jeden Abend.",
    pillarReturnTitle: "Kommen Sie morgen zurück",
    pillarReturnDesc: "Wenn wir nicht zurückkommen würden, ändern wir es.",
    menuHeader: "03 / Kulinarische Karte",
    menuTitle: "Das Menü",
    allergyNoticeTitle: "Allergiehinweis: Bitte informieren Sie unser Personal, wenn Sie an Nahrungsmittelallergien oder -unverträglichkeiten leiden.",
    allergyNoticeAllergens: "Allergene: Gluten · Lupinen (Altramuces) · Sellerie (Apio) · Krebstiere (Crustáceos) · Milchprodukte (Lácteos) · Sesam (Sésamo) · Weichtiere (Moluscos) · Senf (Mostaza) · Nüsse (Nueces) · Eier (Huevos) · Fisch (Pescado) · Soja (Soja) · Erdnüsse (Cacahuetes) · Schwefeldioxid",
    barHeader: "04 / Barkarte",
    barTitle: "Getränke",
    galleryHeader: "05 / Galerie",
    galleryTitle: "Momente des Refugiums",
    gallerySubtitle: "Atmosphäre & Lokal",
    helloHeader: "06 / Atmosphäre & Orte",
    helloTitle: "Sag Hallo",
    addressTitle: "Adresse",
    hoursTitle: "Öffnungszeiten & Unterhaltung",
    hoursDesc: "Täglich von 17:00 bis 24:00 Uhr",
    hoursKitchenNote: "Die Küche schließt um 23:30 Uhr",
    helloLiveMusicBadge: "Jeden Abend Live-Musik",
    phoneTitle: "Telefon",
    bookYourSeat: "Reservieren Sie Ihren Tisch",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Teneriffa, Spanien",
    cartTitle: "Ihre Auswahl",
    cartSubTitle: "El Molino Blanco Bestellkarte",
    cartEmpty: "Noch keine köstlichen Entscheidungen getroffen.",
    cartViewMenu: "Sehen Sie sich die Speisekarte des Restaurants an",
    cartSubtotal: "Zwischensumme",
    cartNotice: "Mehrwertsteuer und Servicegebühren werden in der Tabelle berechnet. Bitte legen Sie diese Bestellung bei Ihrer Ankunft unseren Gastgebern vor oder klicken Sie unten, um die Bestellung vor Ort zu tätigen.",
    cartSendOrder: "Bestellung an die Küche senden",
    cartRemove: "Entfernen",
    reserveLockTitle: "Sperren Sie einen Tisch",
    reserveLockSubTitle: "Reservieren Sie Ihren bewussten, langsamen Morgen",
    reserveFullName: "Ihr vollständiger Name",
    reserveDate: "Datum",
    reserveTime: "Zeit",
    reserveGuests: "Anzahl der Gäste",
    reserveGuestsOption: "Personen",
    reserveGuestsSingle: "1 Person",
    reserveGuestsMultiple: "Personen",
    reserveNote: "Hinweis: Wir behalten Reservierungen für genau 15 Minuten nach dem Slot bei. Für größere Gruppen mit mehr als 8 Gästen wenden Sie sich bitte direkt an unsere Gastgeber unter +34 620 770 072.",
    reserveConfirmButton: "Bestätigen Sie die Tischreservierung",
    reserveSuccessSecured: "Sitz gesichert",
    reserveSuccessExpecting: "Wir erwarten Sie,",
    reserveSuccessDate: "Datum",
    reserveSuccessTime: "Zeit",
    reserveSuccessGuests: "Gäste",
    reserveSuccessGuestsUnit: "Personen",
    reserveSuccessCode: "Reservierungscode",
    reserveSuccessSmsNotice: "Eine Bestätigungs-SMS wurde versendet. Bitte lassen Sie diesen Bildschirm geöffnet oder machen Sie einen Screenshot, um ihn unserem Gastgeber bei Ihrer Ankunft zu präsentieren.",
    reserveSuccessReturn: "Zurück zur Website",
    cat_cold_starters: "Kalte Vorspeisen",
    cat_hot_starters: "Heiße Vorspeisen",
    cat_salads: "Salate",
    cat_meats: "Fleisch",
    cat_sauces_sides: "Beilagen und Saucen",
    cat_fish_seafood: "Fisch und Meeresfrüchte",
    cat_paellas_risottos: "Paellas und Risottos",
    cat_kids_menu: "Kindermenü",
    cat_desserts: "Desserts",
    drink_tab_classics: "Klassiker & Aufnahmen",
    drink_tab_aperitifs_digestifs: "Aperitifs und Digestifs",
    drink_tab_non_alcoholic: "Alkoholfrei",
    drink_cat_classics: "Klassiker",
    drink_cat_aperitifs: "Aperitifs",
    drink_cat_non_alcoholic_cocktails: "Alkoholfreie Cocktails",
    drink_cat_digestifs: "Digestifs",
    drink_cat_shots: "Schüsse"
  },
  fr: {
    navPhilosophy: "Philosophie",
    navMenu: "La Carte",
    navBarCard: "Carte du Bar",
    navFindUs: "Trouvez-nous",
    navBookTable: "Réserver",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Galerie",
    loaderArtisanalCuisine: "Cuisine Artisanale",
    heroLiveMusic: "Musique live tous les soirs",
    heroTitle: "El Molino Blanco",
    heroTagline: "Une cuisine qui donne envie de revenir demain",
    storyHeader: "01 / Notre histoire",
    storyTitle: "Un lieu avec une âme et une histoire",
    storyParagraph1: "EL MOLINO BLANCO est un lieu avec une âme et une histoire, où le temps ralentit et où chaque soirée est empreinte d'un sentiment d'occasion.",
    storyParagraph2: "Situé au sud de Tenerife, le restaurant préserve soigneusement l'esprit de l'hospitalité classique, mêlant des décennies de tradition à d'élégantes touches contemporaines.",
    storyParagraph3: "Ici, la cuisine est un prolongement naturel de l'atmosphère : un éclairage tamisé, de la musique live, une charmante cour et les arômes des plats fraîchement préparés créent un sentiment de fête à la fois familier et inoubliable.",
    storyQuote: "EL MOLINO BLANCO n'est pas seulement un dîner, c'est une rencontre avec l'histoire, les saveurs, les belles chansons célèbres interprétées quotidiennement et l'esprit chaleureux du sud de l'île.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Espace & Événements",
    eventsTitle: "Légendaire depuis les années 1990",
    eventsSubtitle: "Célébrations et espaces",
    eventsAboutTitle: "À propos du restaurant",
    eventsHoursOpen: "Ouvert tous les jours : 17h00 - 00h00",
    eventsMusicHours: "Musique live tous les jours : de 19h30 à 23h30",
    eventsCuisine: "Cuisine méditerranéenne et espagnole",
    eventsPerfectForTitle: "Parfait pour",
    eventsPerfectRomantic: "Dîner romantique",
    eventsPerfectFamily: "Rassemblement de famille",
    eventsPerfectWeddings: "Célébrations de mariage",
    eventsPerfectBanquets: "Banquets et célébrations",
    eventsPerfectCorporate: "Événements d'entreprise",
    eventsSpaceTitle: "Espace et capacité",
    eventsSpaceInside: "Places assises à l'intérieur près des concerts",
    eventsSpaceOutside: "Charmante terrasse extérieure avec jardin",
    eventsSpaceCapacity: "Capacité maximale : 250 convives",
    pillarHonestTitle: "Ingrédients honnêtes",
    pillarHonestDesc: "Guéri en interne. Poêlé sur du vrai beurre. Provenant avec intégrité.",
    pillarMusicTitle: "Musique live",
    pillarMusicDesc: "Des performances acoustiques vibrantes accompagnent votre dîner tous les soirs.",
    pillarReturnTitle: "Retour demain",
    pillarReturnDesc: "Si nous ne revenons pas, nous le changeons.",
    menuHeader: "03 / Carte Culinaire",
    menuTitle: "Le menu",
    allergyNoticeTitle: "Avis d'allergie : veuillez informer notre personnel si vous avez des allergies ou des intolérances alimentaires.",
    allergyNoticeAllergens: "Allergènes : Gluten · Lupins (Altramuces) · Céleri (Apio) · Crustacés (Crustáceos) · Produits laitiers (Lácteos) · Sésame (Sésamo) · Mollusques (Moluscos) · Moutarde (Mostaza) · Noix (Nueces) · Œufs (Huevos) · Poisson (Pescado) · Soja (Soja) · Cacahuètes (Cacahuetes) · Dioxyde de soufre",
    barHeader: "04 / Carte Barre",
    barTitle: "Boissons",
    galleryHeader: "05 / Galerie",
    galleryTitle: "Moments du Sanctuaire",
    gallerySubtitle: "L'Ambiance et le Lieu",
    helloHeader: "06 / Ambiance & Lieux",
    helloTitle: "Dites bonjour",
    addressTitle: "Adresse",
    hoursTitle: "Horaires et divertissements",
    hoursDesc: "Tous les jours de 17h00 à minuit",
    hoursKitchenNote: "La cuisine ferme à 23h30",
    helloLiveMusicBadge: "Musique live tous les soirs",
    phoneTitle: "Téléphone",
    bookYourSeat: "Réservez votre table",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Ténérife, Espagne",
    cartTitle: "Votre sélection",
    cartSubTitle: "Carte de commande El Molino Blanco",
    cartEmpty: "Aucune décision délicieuse n’a encore été prise.",
    cartViewMenu: "Voir le menu du restaurant",
    cartSubtotal: "Sous-total",
    cartNotice: "TVA et frais de service calculés à table. Veuillez présenter cette commande à nos hôtes à votre arrivée, ou cliquez ci-dessous pour verrouiller la commande en interne.",
    cartSendOrder: "Envoyer la commande à la cuisine",
    cartRemove: "Supprimer",
    reserveLockTitle: "Verrouiller une table",
    reserveLockSubTitle: "Réservez votre matinée délibérée et lente",
    reserveFullName: "Votre nom complet",
    reserveDate: "Date",
    reserveTime: "Temps",
    reserveGuests: "Quantité d'invités",
    reserveGuestsOption: "Personnes",
    reserveGuestsSingle: "1 personne",
    reserveGuestsMultiple: "Personnes",
    reserveNote: "Remarque : Nous conservons les réservations précisément 15 minutes après le créneau horaire. Pour les grands groupes dépassant 8 personnes, veuillez contacter directement nos hôtes au +34 620 770 072.",
    reserveConfirmButton: "Confirmer la réservation de table",
    reserveSuccessSecured: "Siège sécurisé",
    reserveSuccessExpecting: "Nous vous attendons,",
    reserveSuccessDate: "Date",
    reserveSuccessTime: "Temps",
    reserveSuccessGuests: "Invités",
    reserveSuccessGuestsUnit: "personnes",
    reserveSuccessCode: "Code de réservation",
    reserveSuccessSmsNotice: "Un SMS de confirmation a été envoyé. Veuillez garder cet écran ouvert ou capturer une capture d'écran pour la présenter à notre hôte à votre arrivée.",
    reserveSuccessReturn: "Retour au site",
    cat_cold_starters: "Entrées froides",
    cat_hot_starters: "Entrées chaudes",
    cat_salads: "Salades",
    cat_meats: "Viandes",
    cat_sauces_sides: "Accompagnements et sauces",
    cat_fish_seafood: "Poissons et fruits de mer",
    cat_paellas_risottos: "Paellas & Risottos",
    cat_kids_menu: "Menus enfants",
    cat_desserts: "Desserts",
    drink_tab_classics: "Classiques et shots",
    drink_tab_aperitifs_digestifs: "Apéritifs & Digestifs",
    drink_tab_non_alcoholic: "Sans alcool",
    drink_cat_classics: "Classiques",
    drink_cat_aperitifs: "Apéritifs",
    drink_cat_non_alcoholic_cocktails: "Cocktails sans alcool",
    drink_cat_digestifs: "Digestifs",
    drink_cat_shots: "Coups de feu"
  },
  it: {
    navPhilosophy: "Filosofia",
    navMenu: "Menù",
    navBarCard: "Carta del Bar",
    navFindUs: "Trovaci",
    navBookTable: "Prenota tavolo",
    navInstagram: "Instagram",
    navEmail: "Email",
    navGallery: "Galleria",
    loaderArtisanalCuisine: "Cucina Artigianale",
    heroLiveMusic: "Musica dal vivo ogni sera",
    heroTitle: "El Molino Blanco",
    heroTagline: "Una cucina che ti fa venir voglia di ritornare domani",
    storyHeader: "01 / La nostra storia",
    storyTitle: "Un luogo con un'anima e una storia",
    storyParagraph1: "EL MOLINO BLANCO è un luogo con un'anima e una storia, dove il tempo rallenta e ogni sera porta con sé il senso dell'occasione.",
    storyParagraph2: "Situato nel sud di Tenerife, il ristorante preserva attentamente lo spirito dell'ospitalità classica, fondendo decenni di tradizione con eleganti tocchi contemporanei.",
    storyParagraph3: "Qui la cucina è una naturale estensione dell'atmosfera: luci soffuse, musica dal vivo, un incantevole cortile e gli aromi dei piatti appena preparati creano un'atmosfera di festa familiare e indimenticabile.",
    storyQuote: "EL MOLINO BLANCO non è solo una cena: è un incontro con la storia, i sapori, le bellissime canzoni famose eseguite ogni giorno e il caldo spirito del sud dell'isola.",
    storyQuoteAuthor: "— El Molino Blanco",
    eventsHeader: "02 / Spazio & Eventi",
    eventsTitle: "Leggendario dagli anni '90",
    eventsSubtitle: "Celebrazioni e spazi",
    eventsAboutTitle: "Informazioni sul ristorante",
    eventsHoursOpen: "Aperto tutti i giorni: 17:00 - 00:00",
    eventsMusicHours: "Musica dal vivo tutti i giorni: 19:30 - 23:30",
    eventsCuisine: "Cucina mediterranea e spagnola",
    eventsPerfectForTitle: "Perfetto per",
    eventsPerfectRomantic: "Cena romantica",
    eventsPerfectFamily: "Riunione di famiglia",
    eventsPerfectWeddings: "Celebrazioni di nozze",
    eventsPerfectBanquets: "Banchetti e Celebrazioni",
    eventsPerfectCorporate: "Eventi aziendali",
    eventsSpaceTitle: "Spazio e capacità",
    eventsSpaceInside: "Posti a sedere al coperto vicino a musica dal vivo",
    eventsSpaceOutside: "Incantevole terrazza con giardino esterno",
    eventsSpaceCapacity: "Capacità massima: 250 ospiti",
    pillarHonestTitle: "Ingredienti onesti",
    pillarHonestDesc: "Curato internamente. Scottato su vero burro. Provenienza con integrità.",
    pillarMusicTitle: "Musica dal vivo",
    pillarMusicDesc: "Vibranti performance acustiche accompagneranno la vostra cena ogni singola sera.",
    pillarReturnTitle: "Ritorna domani",
    pillarReturnDesc: "Se non tornassimo, lo cambieremo.",
    menuHeader: "03 / Scheda culinaria",
    menuTitle: "Il Menù",
    allergyNoticeTitle: "Avviso sulle allergie: Si prega di informare il nostro personale se avete allergie o intolleranze alimentari.",
    allergyNoticeAllergens: "Allergeni: Glutine · Lupini (Altramuces) · Sedano (Apio) · Crostacei (Crustáceos) · Latticini (Lácteos) · Sesamo (Sésamo) · Molluschi (Moluscos) · Senape (Mostaza) · Frutta a guscio (Nueces) · Uova (Huevos) · Pesce (Pescado) · Soia (Soja) · Arachidi (Cacahuetes) · Anidride solforosa",
    barHeader: "04/Scheda dell'Ordine",
    barTitle: "Bevande",
    galleryHeader: "05 / Galleria",
    galleryTitle: "Momenti del Santuario",
    gallerySubtitle: "L'Atmosfera e il Locale",
    helloHeader: "06 / Atmosfera e luoghi",
    helloTitle: "Salutami",
    addressTitle: "Indirizzo",
    hoursTitle: "Orari e intrattenimento",
    hoursDesc: "Tutti i giorni dalle 17:00 a mezzanotte",
    hoursKitchenNote: "La cucina chiude alle 23:30",
    helloLiveMusicBadge: "Musica dal vivo ogni sera",
    phoneTitle: "Telefono",
    bookYourSeat: "Prenota il tuo tavolo",
    footerCopyright: "© 2026 El Molino Blanco",
    footerLocation: "Tenerife, Spagna",
    cartTitle: "La tua selezione",
    cartSubTitle: "Carta d'ordine El Molino Blanco",
    cartEmpty: "Nessuna decisione deliziosa è stata ancora presa.",
    cartViewMenu: "Visualizza il menu del ristorante",
    cartSubtotal: "Totale parziale",
    cartNotice: "IVA e servizio calcolati a tabella. Ti preghiamo di presentare questo ordine ai nostri host all'arrivo o di fare clic di seguito per bloccare l'ordinazione interna.",
    cartSendOrder: "Invia l'ordine in cucina",
    cartRemove: "Rimuovi",
    reserveLockTitle: "Blocca un tavolo",
    reserveLockSubTitle: "Prenota la tua mattinata deliberata e lenta",
    reserveFullName: "Il tuo nome completo",
    reserveDate: "Data",
    reserveTime: "Tempo",
    reserveGuests: "Quantità ospiti",
    reserveGuestsOption: "Persone",
    reserveGuestsSingle: "1 persona",
    reserveGuestsMultiple: "Persone",
    reserveNote: "Nota: conserviamo le prenotazioni esattamente per 15 minuti oltre lo slot. Per gruppi più grandi che superano gli 8 ospiti, contatta direttamente i nostri ospiti al numero +34 620 770 072.",
    reserveConfirmButton: "Conferma la prenotazione del tavolo",
    reserveSuccessSecured: "Sedile assicurato",
    reserveSuccessExpecting: "Ti aspettiamo,",
    reserveSuccessDate: "Data",
    reserveSuccessTime: "Tempo",
    reserveSuccessGuests: "Ospiti",
    reserveSuccessGuestsUnit: "persone",
    reserveSuccessCode: "Codice di prenotazione",
    reserveSuccessSmsNotice: "È stato inviato un SMS di conferma. Tieni questa schermata aperta o acquisisci una schermata da presentare al nostro host all'arrivo.",
    reserveSuccessReturn: "Ritorna al sito",
    cat_cold_starters: "Antipasti freddi",
    cat_hot_starters: "Antipasti caldi",
    cat_salads: "Insalate",
    cat_meats: "Carni",
    cat_sauces_sides: "Contorni e salse",
    cat_fish_seafood: "Pesce e frutti di mare",
    cat_paellas_risottos: "Paella e risotti",
    cat_kids_menu: "Menù per bambini",
    cat_desserts: "Dessert",
    drink_tab_classics: "Classici e scatti",
    drink_tab_aperitifs_digestifs: "Aperitivi e Digestivi",
    drink_tab_non_alcoholic: "Analcolico",
    drink_cat_classics: "Classici",
    drink_cat_aperitifs: "Aperitivi",
    drink_cat_non_alcoholic_cocktails: "Cocktail analcolici",
    drink_cat_digestifs: "Digestivi",
    drink_cat_shots: "Scatti"
  }
};

const dishTranslations: Record<string, Record<string, string>> = {
  ru: {
    "cf1_name": "Нормандские устрицы",
    "cf1_desc": "Нормандские устрицы подаются охлажденными (цена и наличие зависят от сезона/рынка).",
    "cf2_name": "Блюдо из иберийской ветчины",
    "cf2_desc": "Премиальная иберийская копченая ветчина подается с хрустящими тостами в деревенском стиле.",
    "cf3_name": "Выбор сыра на Канарских островах",
    "cf3_desc": "Ассорти местных канарских сыров с мятой, кактусом и цветочным медом, инжирным джемом и гриссини.",
    "cf4_name": "Дуэт севиче из сибаса и креветок",
    "cf4_desc": "Дикие красные креветки и свежий морской окунь, маринованные в цитрусовых соках и красном перце, подаются на подушке из сладкого персика и маракуйи.",
    "cf5_name": "Карпаччо из говяжьей вырезки",
    "cf5_desc": "Тонко нарезанная говяжья вырезка с каперсами, свежей руколой, муссом из сыра пармезан и вялеными помидорами.",
    "cf6_name": "Жареный перец с муссом из козьего сыра",
    "cf6_desc": "Жареный сладкий перец, наполненный сливочно-сырным муссом, фисташковым кремом и сушеными помидорами черри.",
    "cf7_name": "Гаспачо из спелых помидоров",
    "cf7_desc": "Классический охлажденный суп из спелых помидоров, заправленный свежим укропным маслом и подаваемый с домашними тостами.",
    "cs1_name": "Гребешки с нежной спаржей",
    "cs1_desc": "Обжаренные морские гребешки подаются с нежной молодой спаржей с кремом из фенхеля и камчатской красной икрой.",
    "cs2_name": "Запеканка из королевских креветок с чесноком",
    "cs2_desc": "Традиционные испанские шипящие королевские креветки, приготовленные в оливковом масле с чесноком и острым перцем чили.",
    "cs3_name": "Крокеты из иберийской ветчины",
    "cs3_desc": "Хрустящие домашние крокеты с начинкой из насыщенной иберийской ветчины, подаются с нежным домашним майонезом.",
    "cs4_name": "Падрон Пепперс",
    "cs4_desc": "Традиционный испанский зеленый перец в волдырях с добавлением морской соли премиум-класса.",
    "cs5_name": "Ассорти из морепродуктов Трио",
    "cs5_desc": "Копченый осьминог с соусом ромеско и канарским морщинистым картофелем; обжаренный голубой тунец на подушке из водорослей вакаме с насыщенным соусом из кешью; брускетта из домашнего лосося со сливочным сыром и кусочком нежного угря на теплом рисе.",
    "sl1_name": "Классический салат Цезарь",
    "sl1_desc": "Сердечки салата ромэн, классический домашний соус «Цезарь», хрустящие гренки и малосольный лосось.",
    "sl2_name": "Теплый салат с утиным конфи",
    "sl2_desc": "Теплое конфи из тертой утки, дольки свежего апельсина, вареная груша в сладком канарском вине, поджаренные кедровые орешки и заправка из тропических фруктов.",
    "sl3_name": "Карпаччо из свеклы и козьего сыра",
    "sl3_desc": "Тонкое карпаччо из свеклы с хрустящим теплым панированным козьим сыром, лесной черникой, свежей рукколой и кунжутно-ореховой заправкой.",
    "sl4_name": "Запеченные баклажаны по Ромеско",
    "sl4_desc": "Запеченные в духовке баклажаны подаются с густым соусом ромеско, свежим рукколой, ароматными помидорами черри и оливковым маслом, настоянным на травах.",
    "mt1_name": "Медленно тушеные бараньи голяшки",
    "mt1_desc": "Тушеные на медленном огне голяшки ягненка подаются с домашним картофельным пюре и гарниром из жареных овощей.",
    "mt2_name": "Утиное конфи",
    "mt2_desc": "Нежное конфи из утки подается с мандариновым соусом, пюре из сладкого картофеля и овощной смесью.",
    "mt3_name": "Утиная грудка Магрет",
    "mt3_desc": "Магрет из утиной грудки подается с вишней и портвейном, а также с картофельным пюре.",
    "mt4_name": "Тушеный кролик",
    "mt4_desc": "Тушеный кролик, приготовленный с каталонскими оливками и спелыми помидорами черри, в сопровождении молодого картофеля, свежей рукколы и салата из красного лука.",
    "mt5_name": "Фаршированная куриная ножка",
    "mt5_desc": "Куриная ножка, фаршированная азиатскими грибами в медово-горчичном маринаде, подается на подушке из картофельного пюре с нежным сливочным соусом.",
    "mt6_name": "Жареная говяжья вырезка",
    "mt6_desc": "Говяжья вырезка гриль (соусы и гарниры на выбор).",
    "mt7_name": "Стейк Рибай из говядины",
    "mt7_desc": "Стейк рибай из говядины (ок. 900–1600 г). Цена указана за килограмм. В стоимость входит соус на выбор.",
    "mt8_name": "Тибон стейк",
    "mt8_desc": "Стейк Ти-Бон (ок. 1000–1700 г). Цена указана за килограмм. В стоимость входит соус на выбор.",
    "mt9_name": "Шатобриан (мин. 2 чел.)",
    "mt9_desc": "Классический Шатобриан (цена указана на двоих). В стоимость входит соус на выбор.",
    "mt10_name": "Тушеные свиные ребрышки",
    "mt10_desc": "Нежные свиные ребрышки, тушеные в домашнем соусе Барбекю, подаются с картофелем фри.",
    "mt11_name": "Советы по запеканке из говяжьей вырезки",
    "mt11_desc": "Насыщенная запеканка, приготовленная с кончиками говяжьей вырезки и овощами, в сопровождении канарского морщинистого картофеля.",
    "mt12_name": "Бургер с двойной вяленой говядиной",
    "mt12_desc": "Двойной бургер с копченой говядиной, канарским козьим сыром, дикой рукколой и соусом из красных ягод, подается с картофелем фри.",
    "ss1_name": "Перечный соус",
    "ss1_desc": "Классический насыщенный сливочный соус с зеленым перцем.",
    "ss2_name": "Соус из лесных грибов",
    "ss2_desc": "Крем-редукция из жареных лесных грибов.",
    "ss3_name": "Соус Пармезан",
    "ss3_desc": "Сливочный соус из выдержанного пармезана.",
    "ss4_name": "Апельсиновый соус",
    "ss4_desc": "Сладкая и пикантная цитрусовая редукция.",
    "ss5_name": "Шафрановый соус",
    "ss5_desc": "Нежный и ароматный шафраново-сливочный соус.",
    "ss6_name": "Пропаренный рис",
    "ss6_desc": "Идеально приготовленный на пару жасминовый рис.",
    "ss7_name": "Картофель фри",
    "ss7_desc": "Хрустящий золотистый картофель фри.",
    "ss8_name": "Канарский морщинистый картофель",
    "ss8_desc": "Традиционный местный канарский папас арругадас, приготовленный в морской соли.",
    "ss9_name": "Картофельное Пюре",
    "ss9_desc": "Нежное сливочное картофельное пюре, взбитое с маслом.",
    "ss10_name": "Жареные детские овощи",
    "ss10_desc": "Приправленные молодые овощи, обжаренные на оливковом масле.",
    "ss11_name": "Хлеб и масло (на человека)",
    "ss11_desc": "Теплый деревенский хлеб подается с соленым маслом.",
    "ss12_name": "Маринованные оливки",
    "ss12_desc": "Испанские оливки, маринованные в домашних условиях.",
    "fs1_name": "Копченый осьминог",
    "fs1_desc": "Копченый осьминог подается с жареным соусом из сладкого перца, местным канарским картофелем и ароматным маслом из трав.",
    "fs2_name": "Голубой тунец Татаки",
    "fs2_desc": "Татаки из обжаренного голубого тунца на подушке из водорослей вакаме с соусом из жареного кешью и кремом из черного чеснока.",
    "fs3_name": "Филе дикого морского окуня",
    "fs3_desc": "Свежее филе морского окуня, выловленного в дикой природе, подается с тонкими лентами цуккини, пюре из жареной цветной капусты и кедровыми орешками.",
    "fs4_name": "Матримонио Дуэт",
    "fs4_desc": "Нежное сочетание рулета из сибаса с кремом из пармезана и легкого рулета из лосося со спаржей и хрустящей ветчиной, подается с домашним картофельным пюре.",
    "fs5_name": "Филе лосося с икрой",
    "fs5_desc": "Филе лосося подается с нежной спаржей и рисом, дополненное насыщенным соусом из вяленого сыра пармезан и красной икрой.",
    "pr1_name": "Традиционная паэлья El Molino Blanco",
    "pr1_desc": "Настоящая паэлья в стиле El Molino Blanco, приготовленная с кроликом, фасолью гаррофо и зеленой фасолью. Цена указана за человека, минимум 2 человека.",
    "pr2_name": "Паэлья из рыбы и морепродуктов",
    "pr2_desc": "Традиционная испанская паэлья из морепродуктов со свежей рыбой и смесью моллюсков. Цена указана за человека, минимум 2 человека.",
    "pr3_name": "Паэлья с каракатицей из черного риса",
    "pr3_desc": "Паэлья с черными чернилами кальмара, приготовленная с нежной каракатицей, королевскими креветками и сливочно-чесночным алиоли. Цена указана за человека, минимум 2 человека.",
    "pr4_name": "Садовая овощная паэлья",
    "pr4_desc": "Полезная паэлья, приготовленная с сытными сезонными овощами и зеленой фасолью. Цена указана за человека, минимум 2 человека.",
    "pr5_name": "Черное ризотто с морепродуктами",
    "pr5_desc": "Насыщенное сливочное ризотто с черными чернилами кальмара и разнообразным свежим морепродуктом.",
    "pr6_name": "Ризотто с дикими белыми грибами",
    "pr6_desc": "Сливочное ризотто с белыми лесными грибами, дополненное хрустящими грецкими орехами и ароматным маслом из белого трюфеля.",
    "km1_name": "Куриный бургер",
    "km1_desc": "Куриный бургер подается с сыром и картофелем фри.",
    "km2_name": "Сливочная паста с беконом",
    "km2_desc": "Паста, приготовленная со сливочным соусом и беконом.",
    "km3_name": "Куриные наггетсы",
    "km3_desc": "Хрустящие куриные наггетсы подаются с картофелем фри.",
    "km4_name": "Рыбные полоски",
    "km4_desc": "Полоски золотой рыбы подаются с овощной смесью и картофелем фри.",
    "ds1_name": "Клубника фламбе с зеленым перцем",
    "ds1_desc": "Сладкая клубника, фламбированная в зеленом перце. Цена указана за человека, минимум 2 человека.",
    "ds2_name": "Блинчики Сюзетт Фламбе",
    "ds2_desc": "Классические французские блины Сюзетта фламбе. Цена указана за человека, минимум 2 человека.",
    "ds3_name": "Банановый фламбе",
    "ds3_desc": "Бананы фламбе на вашем столе. Цена указана за человека, минимум 2 человека.",
    "ds4_name": "Персиковое фламбе с виски",
    "ds4_desc": "Сладкий персик, фламбированный с виски. Цена указана за человека, минимум 2 человека.",
    "ds5_name": "Фисташковый Тирамису",
    "ds5_desc": "Традиционный тирамису с насыщенным фисташковым кремом.",
    "ds6_name": "Панна Котта «Апельсин и Куантро»",
    "ds6_desc": "Сливочная панна котта с апельсином и ликером Куантро, подается со свежими сезонными фруктами.",
    "ds7_name": "Баскский чизкейк",
    "ds7_desc": "Запеченный баскский чизкейк с поджаренным фундуком, местным канарским бананом и ореховым ликером Франжелико.",
    "ds8_name": "Миллефей с малиной и белым шоколадом",
    "ds8_desc": "Хрустящее слоеное тесто со свежей малиной, маскарпоне и кремом из белого шоколада.",
    "ds9_name": "Шоколадный кулан",
    "ds9_desc": "Лава-торт из расплавленного шоколада подается с шариком ванильного мороженого.",
    "ds10_name": "Мороженое с тремя вкусами",
    "ds10_desc": "Три вкуса мороженого на выбор, подаются со свежими взбитыми сливками."
  },
  de: {
    "cf1_name": "Austern aus der Normandie",
    "cf1_desc": "Austern aus der Normandie werden gekühlt serviert (Preis und Verfügbarkeit je nach Saison/Markt).",
    "cf2_name": "Iberische Schinkenplatte",
    "cf2_desc": "Erstklassiger iberischer Schinken, serviert mit knusprigem, rustikalem Toast.",
    "cf3_name": "Kanarische Käseauswahl",
    "cf3_desc": "Verschiedene lokale kanarische Käsesorten, begleitet von Minze, Kaktus- und Blütenhonig, Feigenmarmelade und Grissini.",
    "cf4_name": "Ceviche-Duo aus Seebarsch und Garnelen",
    "cf4_desc": "Wilde rote Garnelen und frischer Wolfsbarsch, mariniert in Zitrussäften und rotem Pfeffer, serviert auf einem Bett aus süßem Pfirsich und Passionsfrucht.",
    "cf5_name": "Rinderfilet-Carpaccio",
    "cf5_desc": "Dünn geschnittenes Rinderfilet garniert mit Kapern, frischem Wildrucola, Parmesankäsemousse und sonnengetrockneten Tomaten.",
    "cf6_name": "Geröstete Paprika mit Ziegenkäsemousse",
    "cf6_desc": "Geröstete Paprika, gefüllt mit cremiger Käsemousse, Pistaziencreme und dehydrierten Kirschtomaten.",
    "cf7_name": "Reife Tomaten-Gazpacho",
    "cf7_desc": "Klassische gekühlte Suppe aus reifen Tomaten, verfeinert mit frischem Dillöl und serviert mit hausgemachtem Toast.",
    "cs1_name": "Jakobsmuscheln auf zartem Spargel",
    "cs1_desc": "In der Pfanne gebratene Jakobsmuscheln, serviert auf zartem jungem Spargel mit Fenchelcreme und rotem Kamtschatka-Kaviar.",
    "cs2_name": "Knoblauch-Riesengarnelen-Auflauf",
    "cs2_desc": "Traditionelle spanische Riesengarnelen, gekocht in mit Knoblauch angereichertem Olivenöl und scharfen Chilischoten.",
    "cs3_name": "Kroketten mit iberischem Schinken",
    "cs3_desc": "Knusprige hausgemachte Kroketten gefüllt mit reichhaltigem iberischem Schinken, serviert mit sanfter hausgemachter Mayonnaise.",
    "cs4_name": "Padrón-Paprika",
    "cs4_desc": "Traditionelle spanische, blasierte grüne Paprika, verfeinert mit erstklassigem, flockigem Meersalz.",
    "cs5_name": "Meeresfrüchte-Sortiment-Trio",
    "cs5_desc": "Geräucherter Oktopus mit Romesco-Sauce und kanarischen Runzelkartoffeln; gebratener Roter Thunfisch auf einem Bett aus Wakame-Algen mit reichhaltiger Cashewsauce; hausgemachtes Lachs-Bruschetta mit Frischkäse und einer Scheibe zartem Aal auf warmem Reis.",
    "sl1_name": "Klassischer Caesar-Salat",
    "sl1_desc": "Römersalatherzen, klassisches hausgemachtes Caesar-Dressing, knusprige Croutons und leicht gesalzener Lachs.",
    "sl2_name": "Warmer Enten-Confit-Salat",
    "sl2_desc": "Warmes, zerkleinertes Entenconfit, frische Orangensegmente, in Wein pochierte Birne in kanarischem Süßwein, geröstete Pinienkerne und tropisches Fruchtdressing.",
    "sl3_name": "Rote-Bete-Carpaccio und Ziegenkäse",
    "sl3_desc": "Dünnes Rote-Bete-Carpaccio, garniert mit knusprig warm paniertem Ziegenkäse, wilden Blaubeeren, frischem Rucola und Sesam-Nuss-Dressing.",
    "sl4_name": "Gebackene Auberginen über Romesco",
    "sl4_desc": "Im Ofen gebackene Auberginen, serviert auf einem reichhaltigen Bett aus Romesco-Sauce, garniert mit frischem Rucola, aromatischen Kirschtomaten und mit Kräutern angereichertem Olivenöl.",
    "mt1_name": "Langsam gedünstete Lammkeulen",
    "mt1_desc": "Langsam geschmorte Lammkeulen, serviert mit hausgemachtem Kartoffelpüree und einer Beilage aus geröstetem Gemüse.",
    "mt2_name": "Entenconfit",
    "mt2_desc": "Zartes Entenconfit serviert mit Mandarinensauce, Süßkartoffelpüree und gemischtem Gemüse.",
    "mt3_name": "Entenbrustmagret",
    "mt3_desc": "Entenbrustmagret serviert mit Kirsch- und Portweinreduktion auf Kartoffelpüree.",
    "mt4_name": "Geschmortes Kaninchen",
    "mt4_desc": "Geschmortes Kaninchen, gekocht mit katalanischen Oliven und reifen Kirschtomaten, begleitet von neuen Kartoffeln, frischem Rucola und rotem Zwiebelsalat.",
    "mt5_name": "Gefüllte Hähnchenkeule",
    "mt5_desc": "Hähnchenschenkel gefüllt mit mit Honig-Senf marinierten asiatischen Pilzen, serviert auf einem Bett aus Kartoffelpüree mit einer zarten Sahnesauce.",
    "mt6_name": "Gegrilltes Rinderfilet",
    "mt6_desc": "Gegrilltes Rinderfilet (Soßen und Beilagen nach Wahl).",
    "mt7_name": "Rinder-Ribeye-Steak",
    "mt7_desc": "Rinder-Ribeye-Steak (ca. 900–1600 g). Der Preis gilt pro Kilogramm. Inklusive Soße nach Wahl.",
    "mt8_name": "T-Bone-Steak",
    "mt8_desc": "T-Bone-Steak (ca. 1000–1700 g). Der Preis gilt pro Kilogramm. Inklusive Soße nach Wahl.",
    "mt9_name": "Chateaubriand (Min. 2 Personen)",
    "mt9_desc": "Klassisches Chateaubriand (Preis gilt für zwei Personen). Inklusive Soße nach Wahl.",
    "mt10_name": "Geschmorte Schweinerippchen",
    "mt10_desc": "Zarte Schweinerippchen, geschmort in hausgemachter BBQ-Sauce, serviert mit Pommes Frites.",
    "mt11_name": "Auflauf mit Rinderfiletspitzen",
    "mt11_desc": "Reichhaltiger Auflauf mit Rinderfiletspitzen und Gemüse, dazu kanarische Runzelkartoffeln.",
    "mt12_name": "Double Cured Beef Burger",
    "mt12_desc": "Doppelter Burger mit gepökeltem Rindfleisch, kanarischem Ziegenkäse, wildem Rucola und roter Beerensauce, serviert mit Pommes Frites.",
    "ss1_name": "Pfeffersauce",
    "ss1_desc": "Klassische reichhaltige Sahnesauce aus grünem Pfeffer.",
    "ss2_name": "Wildpilzsauce",
    "ss2_desc": "Rahmreduktion mit sautierten Waldpilzen.",
    "ss3_name": "Parmesansauce",
    "ss3_desc": "Cremige gereifte Parmesansauce.",
    "ss4_name": "Orangensauce",
    "ss4_desc": "Süße und würzige Zitrusreduktion.",
    "ss5_name": "Safransauce",
    "ss5_desc": "Zarte und aromatische Safran-Sahnesauce.",
    "ss6_name": "Gedämpfter Reis",
    "ss6_desc": "Perfekt gedämpfter Jasminreis.",
    "ss7_name": "Pommes Frites",
    "ss7_desc": "Knusprige goldene Pommes Frites.",
    "ss8_name": "Kanarische Runzelkartoffeln",
    "ss8_desc": "Traditionelle kanarische Papas Arrugadas, gekocht in Meersalz.",
    "ss9_name": "Kartoffelpüree",
    "ss9_desc": "Cremiges, glattes, mit Butter geschlagenes Kartoffelpüree.",
    "ss10_name": "Sautiertes Babygemüse",
    "ss10_desc": "Gewürztes, in der Pfanne gebratenes Babygemüse in Olivenöl.",
    "ss11_name": "Brot und Butter (pro Person)",
    "ss11_desc": "Warmes, rustikales Brot, serviert mit gesalzener Butter.",
    "ss12_name": "Marinierte Oliven",
    "ss12_desc": "Hausmarinierte spanische Oliven.",
    "fs1_name": "Geräucherter Oktopus",
    "fs1_desc": "Geräucherter Oktopus, serviert mit gerösteter Paprikasauce, lokalen kanarischen Runzelkartoffeln und aromatischem Kräuteröl.",
    "fs2_name": "Blauflossen-Thunfisch Tataki",
    "fs2_desc": "Gebratener Roter Thunfisch-Tataki auf einem Bett aus Wakame-Algen mit gerösteter Cashew-Sauce und schwarzer Knoblauchcreme.",
    "fs3_name": "Wildes Wolfsbarschfilet",
    "fs3_desc": "Frisches Wolfsbarschfilet aus Wildfang, serviert mit dünnen Zucchinistreifen, geröstetem Blumenkohlpüree und Pinienkernen.",
    "fs4_name": "Ehe-Duett",
    "fs4_desc": "Köstliche Kombination aus Wolfsbarschrolle mit Parmesancreme und leichtem Lachswickel mit Spargel und knusprigem Schinken, serviert mit hausgemachtem Kartoffelpüree.",
    "fs5_name": "Lachsfilet mit Kaviar",
    "fs5_desc": "Lachsfilet serviert auf zartem Spargel und Reis, abgerundet mit reichhaltiger Parmesankäsesauce und rotem Kaviar.",
    "pr1_name": "Traditionelle El Molino Blanco Paella",
    "pr1_desc": "Authentische Paella im El Molino Blanco-Stil, zubereitet mit Kaninchen, Garrofó-Bohnen und grünen Bohnen. Der Preis gilt pro Person, mindestens 2 Personen.",
    "pr2_name": "Paella mit Fisch und Meeresfrüchten",
    "pr2_desc": "Traditionelle spanische Meeresfrüchte-Paella mit frischem Fisch und gemischten Schalentieren. Der Preis gilt pro Person, mindestens 2 Personen.",
    "pr3_name": "Tintenfisch-Paella mit schwarzem Reis",
    "pr3_desc": "Paella mit schwarzer Tintenfischtinte, gekocht mit zartem Tintenfisch, Riesengarnelen und cremiger Knoblauch-Alioli. Der Preis gilt pro Person, mindestens 2 Personen.",
    "pr4_name": "Gartengemüse-Paella",
    "pr4_desc": "Gesunde Paella, zubereitet mit reichhaltigem Gemüse der Saison und grünen Bohnen. Der Preis gilt pro Person, mindestens 2 Personen.",
    "pr5_name": "Schwarzes Risotto mit Meeresfrüchten",
    "pr5_desc": "Reichhaltiges und cremiges Risotto mit schwarzer Tintenfischtinte, beladen mit frischen Meeresfrüchten.",
    "pr6_name": "Risotto mit wilden weißen Pilzen",
    "pr6_desc": "Cremiges Risotto mit weißen Waldpilzen, verfeinert mit knackigen Walnüssen und duftendem weißem Trüffelöl.",
    "km1_name": "Hühnerburger",
    "km1_desc": "Hühnerburger serviert mit Käse und Pommes.",
    "km2_name": "Cremige Specknudeln",
    "km2_desc": "Nudeln gekocht mit Sahnesauce und Speck.",
    "km3_name": "Hühnernuggets",
    "km3_desc": "Knusprige Chicken Nuggets serviert mit Pommes Frites.",
    "km4_name": "Fischstreifen",
    "km4_desc": "Goldene Fischstreifen serviert mit gemischtem Gemüse und Pommes Frites.",
    "ds1_name": "Flambierte Erdbeeren mit grünem Pfeffer",
    "ds1_desc": "Süße Erdbeeren, flambiert in grünem Pfeffer. Der Preis gilt pro Person, mindestens 2 Personen.",
    "ds2_name": "Crepes Suzette Flambé",
    "ds2_desc": "Klassische französische Crêpes Suzette flambiert. Der Preis gilt pro Person, mindestens 2 Personen.",
    "ds3_name": "Bananenflambieren",
    "ds3_desc": "Am Tisch flambierte Bananen. Der Preis gilt pro Person, mindestens 2 Personen.",
    "ds4_name": "Pfirsich flambiert mit Whiskey",
    "ds4_desc": "Mit Whisky flambierter süßer Pfirsich. Der Preis gilt pro Person, mindestens 2 Personen.",
    "ds5_name": "Pistazien-Tiramisu",
    "ds5_desc": "Traditionelles Tiramisu mit reichhaltiger Pistaziencreme.",
    "ds6_name": "Orange & Cointreau Panna Cotta",
    "ds6_desc": "Cremige Panna Cotta mit Orangen- und Cointreau-Likör, serviert mit frischen Früchten der Saison.",
    "ds7_name": "Baskischer Käsekuchen",
    "ds7_desc": "Gebackener baskischer Käsekuchen mit gerösteten Haselnüssen, lokaler kanarischer Banane und Frangelico-Haselnusslikör.",
    "ds8_name": "Millefeuille mit Himbeere und weißer Schokolade",
    "ds8_desc": "Knuspriger Blätterteig mit frischen Himbeeren, Mascarpone und weißer Schokoladencreme.",
    "ds9_name": "Schokoladen-Coulant",
    "ds9_desc": "Geschmolzener Schokoladen-Lavakuchen, serviert mit einer Kugel Vanilleeis.",
    "ds10_name": "Eis mit drei Geschmacksrichtungen",
    "ds10_desc": "Auswahl aus drei Eissorten, serviert mit frischer Schlagsahne."
  },
  fr: {
    "cf1_name": "Huîtres de Normandie",
    "cf1_desc": "Huîtres normandes servies fraîches (prix et disponibilité selon saison/marché).",
    "cf2_name": "Assiette de jambon ibérique",
    "cf2_desc": "Jambon ibérique de première qualité servi avec du pain grillé rustique croustillant.",
    "cf3_name": "Sélection de fromages des îles Canaries",
    "cf3_desc": "Assortiment de fromages locaux des Canaries accompagnés de miel de menthe, de cactus et de fleurs, de confiture de figues et de grissini.",
    "cf4_name": "Duo de Ceviche de Bar et Crevettes",
    "cf4_desc": "Crevettes rouges sauvages et bar frais marinés dans des jus d'agrumes et du poivron rouge, servis sur un lit de pêche sucrée et de fruit de la passion.",
    "cf5_name": "Carpaccio de filet de bœuf",
    "cf5_desc": "Filet de bœuf finement tranché garni de câpres, de roquette sauvage fraîche, de mousse au parmesan et de tomates séchées au soleil.",
    "cf6_name": "Poivron rôti à la mousse de chèvre",
    "cf6_desc": "Poivron rôti fourré de mousse crémeuse au fromage, crème de pistache et tomates cerises déshydratées.",
    "cf7_name": "Gaspacho de tomates mûres",
    "cf7_desc": "Soupe réfrigérée classique de tomates mûries sur vigne, agrémentée d'huile d'aneth fraîche et servie avec du pain grillé maison.",
    "cs1_name": "Pétoncles sur asperges tendres",
    "cs1_desc": "Coquilles Saint-Jacques poêlées servies sur de tendres petites asperges avec crème de fenouil et caviar rouge du Kamtchatka.",
    "cs2_name": "Casserole de gambas à l'ail",
    "cs2_desc": "Gambas espagnoles traditionnelles grésillantes cuites dans de l'huile d'olive infusée à l'ail et des piments forts.",
    "cs3_name": "Croquettes de jambon ibérique",
    "cs3_desc": "Croquettes maison croustillantes fourrées au riche jambon ibérique, servies avec une mayonnaise maison onctueuse.",
    "cs4_name": "Piments Padrón",
    "cs4_desc": "Poivrons verts traditionnels espagnols agrémentés de sel de mer feuilleté de première qualité.",
    "cs5_name": "Trio d'assortiment de fruits de mer",
    "cs5_desc": "Poulpe fumé avec sauce romesco et pommes de terre ridées des Canaries ; thon rouge poêlé sur lit d'algues wakame avec une riche sauce aux noix de cajou ; bruschetta de saumon maison avec du fromage à la crème et une tranche d'anguille tendre sur du riz chaud.",
    "sl1_name": "Salade César Classique",
    "sl1_desc": "Cœurs de laitue romaine, vinaigrette César maison classique, croûtons croquants et saumon salé légèrement salé.",
    "sl2_name": "Salade tiède de canard confit",
    "sl2_desc": "Confit de canard effiloché chaud, quartiers d'orange fraîche, poire pochée au vin doux des Canaries, pignons de pin grillés et vinaigrette aux fruits tropicaux.",
    "sl3_name": "Carpaccio de Betterave & Fromage de Chèvre",
    "sl3_desc": "Carpaccio fin de betterave rouge garni de fromage de chèvre pané chaud et croustillant, de myrtilles sauvages, de roquette fraîche et de vinaigrette aux noix de sésame.",
    "sl4_name": "Aubergines au four sur Romesco",
    "sl4_desc": "Aubergines cuites au four servies sur un riche lit de sauce romesco, garnies de roquette fraîche, de tomates cerises aromatiques et d'huile d'olive infusée aux herbes.",
    "mt1_name": "Jarrets d'agneau mijotés lentement",
    "mt1_desc": "Jarret d'agneau mijoté accompagné d'une purée de pommes de terre maison et d'une garniture de légumes rôtis.",
    "mt2_name": "Canard Confit",
    "mt2_desc": "Tendre confit de canard servi avec sauce à la mandarine, purée de patate douce et mélange de légumes.",
    "mt3_name": "Magret De Canard",
    "mt3_desc": "Magret de magret de canard servi avec réduction de cerises et vin de Porto sur purée de pommes de terre.",
    "mt4_name": "Lapin Braisé",
    "mt4_desc": "Ragoût de lapin cuit avec des olives catalanes et des tomates cerises mûres, accompagné de pommes de terre nouvelles, roquette fraîche et salade d'oignons rouges.",
    "mt5_name": "Cuisse de poulet farcie",
    "mt5_desc": "Cuisse de poulet farcie de champignons asiatiques marinés à la moutarde au miel, servie sur un lit de purée de pommes de terre avec une délicate sauce à la crème.",
    "mt6_name": "Filet de bœuf grillé",
    "mt6_desc": "Filet de bœuf grillé (sauces et accompagnements au choix).",
    "mt7_name": "Steak de faux-filet de bœuf",
    "mt7_desc": "Steak de faux-filet de bœuf (environ 900 à 1 600 g). Le prix est par kilogramme. Comprend un choix de sauce.",
    "mt8_name": "Steak T-Bone",
    "mt8_desc": "Steak T-Bone (environ 1 000 à 1 700 g). Le prix est par kilogramme. Comprend un choix de sauce.",
    "mt9_name": "Chateaubriand (Min. 2 Pax)",
    "mt9_desc": "Chateaubriand classique (le prix est pour deux personnes). Comprend un choix de sauce.",
    "mt10_name": "Côtes de porc mijotées",
    "mt10_desc": "Tendres côtes de porc braisées dans une sauce BBQ maison, servies avec frites.",
    "mt11_name": "Casserole de pointes de filet de bœuf",
    "mt11_desc": "Riche cocotte cuite avec des pointes de filet de bœuf et des légumes, accompagnée de pommes de terre ridées des Canaries.",
    "mt12_name": "Burger de bœuf doublement salé",
    "mt12_desc": "Double burger au bœuf salé, fromage de chèvre des Canaries, roquette sauvage et sauce aux fruits rouges, servi avec frites.",
    "ss1_name": "Sauce au poivre",
    "ss1_desc": "Sauce crémeuse classique et riche au poivre vert.",
    "ss2_name": "Sauce aux champignons sauvages",
    "ss2_desc": "Réduction de crème de champignons sauvages sautés.",
    "ss3_name": "Sauce Parmesan",
    "ss3_desc": "Sauce crémeuse au parmesan vieilli.",
    "ss4_name": "Sauce à l'Orange",
    "ss4_desc": "Réduction d'agrumes douce et acidulée.",
    "ss5_name": "Sauce au Safran",
    "ss5_desc": "Sauce crémeuse au safran délicate et aromatique.",
    "ss6_name": "Riz cuit à la vapeur",
    "ss6_desc": "Riz au jasmin parfaitement cuit à la vapeur.",
    "ss7_name": "Frites",
    "ss7_desc": "Frites dorées croustillantes.",
    "ss8_name": "Pommes de terre ridées des Canaries",
    "ss8_desc": "Papas arrugadas traditionnels canariens locaux cuits dans du sel marin.",
    "ss9_name": "Purée de pommes de terre",
    "ss9_desc": "Purée de pommes de terre fouettée au beurre onctueuse et crémeuse.",
    "ss10_name": "Petits légumes sautés",
    "ss10_desc": "Petits légumes assaisonnés poêlés à l'huile d'olive.",
    "ss11_name": "Pain et beurre (par personne)",
    "ss11_desc": "Pain de campagne chaud servi avec du beurre salé.",
    "ss12_name": "Olives marinées",
    "ss12_desc": "Olives espagnoles marinées maison.",
    "fs1_name": "Poulpe Fumé",
    "fs1_desc": "Poulpe fumé servi avec une sauce aux poivrons doux rôtis, des pommes de terre ridées locales des Canaries et de l'huile d'herbes aromatiques.",
    "fs2_name": "Tataki de thon rouge",
    "fs2_desc": "Tataki de thon rouge poêlé sur lit d'algues wakame avec sauce aux noix de cajou rôties et crème d'ail noir.",
    "fs3_name": "Filet de bar sauvage",
    "fs3_desc": "Filet de bar frais de pêche sauvage servi avec de fins rubans de courgettes, purée de chou-fleur rôti et pignons de pin.",
    "fs4_name": "Duo de mariage",
    "fs4_desc": "Accord délicat de rouleau de bar à la crème de parmesan et de wrap léger de saumon aux asperges et jambon croustillant, servi avec une purée de pommes de terre maison.",
    "fs5_name": "Filet de saumon au caviar",
    "fs5_desc": "Filet de saumon servi sur des asperges tendres et du riz, agrémenté d'une riche sauce au parmesan affiné et au caviar rouge.",
    "pr1_name": "Paella traditionnelle El Molino Blanco",
    "pr1_desc": "Authentique paella de style El Molino Blanco cuite avec du lapin, des haricots garrofó et des haricots verts. Le prix est par personne, minimum 2 personnes.",
    "pr2_name": "Paella au poisson et aux fruits de mer",
    "pr2_desc": "Paella espagnole traditionnelle aux fruits de mer avec du poisson frais et des fruits de mer mélangés. Le prix est par personne, minimum 2 personnes.",
    "pr3_name": "Paella De Seiche Au Riz Noir",
    "pr3_desc": "Paella à l'encre de seiche noire cuite avec de tendres seiches, des gambas et un aïoli crémeux à l'ail. Le prix est par personne, minimum 2 personnes.",
    "pr4_name": "Paella aux légumes du jardin",
    "pr4_desc": "Paella saine cuisinée avec de riches légumes de saison et des haricots verts. Le prix est par personne, minimum 2 personnes.",
    "pr5_name": "Risotto noir aux fruits de mer",
    "pr5_desc": "Risotto à l'encre de seiche noire riche et crémeux chargé de fruits de mer frais assortis.",
    "pr6_name": "Risotto aux champignons blancs sauvages",
    "pr6_desc": "Risotto crémeux aux champignons des bois blancs, garni de noix croquantes et d'huile de truffe blanche parfumée.",
    "km1_name": "Burger au poulet",
    "km1_desc": "Burger de poulet servi avec fromage et frites.",
    "km2_name": "Pâtes crémeuses au bacon",
    "km2_desc": "Pâtes cuites avec sauce à la crème et bacon.",
    "km3_name": "Nuggets de poulet",
    "km3_desc": "Nuggets de poulet croustillants servis avec frites.",
    "km4_name": "Lanières de poisson",
    "km4_desc": "Lanières de poisson dorées servies avec un mélange de légumes et des frites.",
    "ds1_name": "Fraises flambées au poivre vert",
    "ds1_desc": "Fraises sucrées flambées au poivre vert. Le prix est par personne, minimum 2 personnes.",
    "ds2_name": "Crêpes Suzette Flambée",
    "ds2_desc": "Crêpes françaises classiques flambées Suzette. Le prix est par personne, minimum 2 personnes.",
    "ds3_name": "Banane Flambée",
    "ds3_desc": "Des bananes flambées à votre table. Le prix est par personne, minimum 2 personnes.",
    "ds4_name": "Pêche Flambée au Whisky",
    "ds4_desc": "Pêche sucrée flambée au whisky. Le prix est par personne, minimum 2 personnes.",
    "ds5_name": "Tiramisu aux pistaches",
    "ds5_desc": "Tiramisu traditionnel recouvert d'une riche crème de pistache.",
    "ds6_name": "Panna Cotta à l'Orange et au Cointreau",
    "ds6_desc": "Panna cotta crémeuse infusée à l'orange et à la liqueur de Cointreau, servie avec des fruits frais de saison.",
    "ds7_name": "Cheesecake Basque",
    "ds7_desc": "Cheesecake basque au four avec noisettes grillées, banane locale des Canaries et liqueur de noisettes Frangelico.",
    "ds8_name": "Millefeuille Framboise & Chocolat Blanc",
    "ds8_desc": "Pâte feuilletée croustillante recouverte de framboises fraîches, de mascarpone et de crème au chocolat blanc.",
    "ds9_name": "Coulant au chocolat",
    "ds9_desc": "Gâteau de lave au chocolat fondu servi avec une boule de glace à la vanille.",
    "ds10_name": "Glace aux trois parfums",
    "ds10_desc": "Sélection de trois parfums de glace servie avec de la crème fraîche fouettée."
  },
  it: {
    "cf1_name": "Ostriche della Normandia",
    "cf1_desc": "Ostriche della Normandia servite fredde (prezzo e disponibilità secondo stagione/mercato).",
    "cf2_name": "Piatto Di Prosciutto Iberico",
    "cf2_desc": "Prosciutto iberico premium servito con crostini rustici croccanti.",
    "cf3_name": "Selezione di formaggi delle Isole Canarie",
    "cf3_desc": "Assortimento di formaggi locali delle Canarie accompagnati da miele di menta, cactus e fiori, marmellata di fichi e grissini.",
    "cf4_name": "Duo di ceviche di branzino e gamberi",
    "cf4_desc": "Gamberi rossi selvatici e spigola fresca marinati in succhi di agrumi e peperoncino, serviti su un letto di pesca dolce e frutto della passione.",
    "cf5_name": "Carpaccio Di Filetto Di Manzo",
    "cf5_desc": "Filetto di manzo tagliato a fettine sottili condito con capperi, rucola fresca, mousse di parmigiano e pomodori secchi.",
    "cf6_name": "Peperoni Arrostiti Con Mousse Di Formaggio Di Capra",
    "cf6_desc": "Peperoni arrostiti ripieni di mousse cremosa al formaggio, crema di pistacchi e pomodorini disidratati.",
    "cf7_name": "Gazpacho di pomodori maturi",
    "cf7_desc": "Classica zuppa fredda di pomodori maturi, condita con olio di aneto fresco e servita con pane tostato fatto in casa.",
    "cs1_name": "Capesante su asparagi teneri",
    "cs1_desc": "Capesante scottate in padella servite su teneri asparagi novelli con crema di finocchi e caviale rosso della Kamchatka.",
    "cs2_name": "Casseruola di gamberoni all'aglio",
    "cs2_desc": "Gamberoni spagnoli tradizionali frizzanti cotti in olio d'oliva aromatizzato all'aglio e peperoncini piccanti.",
    "cs3_name": "Crocchette di prosciutto iberico",
    "cs3_desc": "Croccanti crocchette fatte in casa ripiene di ricco prosciutto iberico, servite con morbida maionese della casa.",
    "cs4_name": "Friggitelli",
    "cs4_desc": "Peperoni verdi tradizionali spagnoli rifiniti con sale marino a scaglie di prima qualità.",
    "cs5_name": "Tris di assortimento di frutti di mare",
    "cs5_desc": "Polpo affumicato con salsa romesco e patate rugose delle Canarie; tonno rosso scottato su letto di alghe wakame con ricca salsa di anacardi; bruschetta al salmone fatto in casa con crema di formaggio e una fetta di tenera anguilla su riso caldo.",
    "sl1_name": "Insalata Caesar classica",
    "sl1_desc": "Cuori di lattuga romana, classico condimento Caesar fatto in casa, crostini croccanti e salmone stagionato leggermente salato.",
    "sl2_name": "Insalata tiepida di anatra confit",
    "sl2_desc": "Confit d'anatra caldo grattugiato, spicchi d'arancia freschi, pera affogata nel vino dolce delle Canarie, pinoli tostati e salsa di frutta tropicale.",
    "sl3_name": "Carpaccio di Barbabietola e Formaggio di Capra",
    "sl3_desc": "Carpaccio sottile di barbabietola condito con formaggio di capra caldo e croccante, mirtilli selvatici, rucola fresca e salsa di sesamo e noci.",
    "sl4_name": "Melanzane al forno su Romesco",
    "sl4_desc": "Melanzane al forno servite su un ricco letto di salsa romesco, condita con rucola fresca, pomodorini aromatici e olio d'oliva infuso alle erbe.",
    "mt1_name": "Stinco di agnello stufato lentamente",
    "mt1_desc": "Stinco di agnello in umido servito con purè di patate fatto in casa e contorno di verdure arrostite.",
    "mt2_name": "Confettura d'anatra",
    "mt2_desc": "Tenera anatra confit servita con salsa al mandarino, purea di patate dolci e verdure miste.",
    "mt3_name": "Magret al petto d'anatra",
    "mt3_desc": "Magret di petto d'anatra servito con ciliegie e riduzione di vino Porto su purè di patate.",
    "mt4_name": "Coniglio Brasato",
    "mt4_desc": "Coniglio in umido cucinato con olive catalane e pomodorini maturi, accompagnato da patate novelle, rucola fresca e insalata di cipolla rossa.",
    "mt5_name": "Coscia di pollo ripiena",
    "mt5_desc": "Coscia di pollo ripiena di funghi asiatici marinati al miele e senape, serviti su un letto di purè di patate con una delicata salsa di panna.",
    "mt6_name": "Filetto Di Manzo Alla Griglia",
    "mt6_desc": "Filetto di manzo alla griglia (salse e contorni a scelta).",
    "mt7_name": "Bistecca di ribeye di manzo",
    "mt7_desc": "Bistecca di manzo ribeye (ca. 900–1600 g). Il prezzo è per chilogrammo. Include la scelta della salsa.",
    "mt8_name": "Bistecca con l'osso",
    "mt8_desc": "Bistecca alla fiorentina (ca. 1000–1700 g). Il prezzo è per chilogrammo. Include la scelta della salsa.",
    "mt9_name": "Chateaubriand (minimo 2 persone)",
    "mt9_desc": "Chateaubriand classico (il prezzo è per due persone). Include la scelta della salsa.",
    "mt10_name": "Costolette di maiale in umido",
    "mt10_desc": "Tenerissime costolette di maiale brasate nella salsa BBQ della casa, servite con patatine fritte.",
    "mt11_name": "Casseruola di punte di filetto di manzo",
    "mt11_desc": "Ricca casseruola cucinata con punte di filetto di manzo e verdure, accompagnata da patate rugose delle Canarie.",
    "mt12_name": "Hamburger di manzo doppio stagionato",
    "mt12_desc": "Doppio hamburger con carne di manzo stagionata, formaggio di capra delle Canarie, rucola selvatica e salsa ai frutti rossi, servito con patatine fritte.",
    "ss1_name": "Salsa al pepe verde",
    "ss1_desc": "classica salsa ricca al pepe verde.",
    "ss2_name": "Salsa ai funghi selvatici",
    "ss2_desc": "Riduzione di crema di funghi trifolati.",
    "ss3_name": "Salsa al parmigiano",
    "ss3_desc": "Salsa cremosa al parmigiano stagionato.",
    "ss4_name": "Salsa all'arancia",
    "ss4_desc": "Riduzione di agrumi dolce e piccante.",
    "ss5_name": "Salsa allo zafferano",
    "ss5_desc": "Salsa delicata e aromatica alla crema di zafferano.",
    "ss6_name": "Riso Al Vapore",
    "ss6_desc": "Riso al gelsomino perfettamente cotto a vapore.",
    "ss7_name": "Patatine fritte",
    "ss7_desc": "Patatine fritte dorate e croccanti.",
    "ss8_name": "Patate tradizionali Canarie",
    "ss8_desc": "Papas arrugadas tradizionali delle Canarie cotte nel sale marino.",
    "ss9_name": "Purè Di Patate",
    "ss9_desc": "Purè di patate cremoso e liscio montato al burro.",
    "ss10_name": "Verdure saltate",
    "ss10_desc": "Verdure novelle condite saltate in padella in olio d'oliva.",
    "ss11_name": "Pane e burro (a persona)",
    "ss11_desc": "Pane rustico caldo servito con burro salato.",
    "ss12_name": "Olive Marinate",
    "ss12_desc": "Olive spagnole marinate in casa.",
    "fs1_name": "Polpo Affumicato",
    "fs1_desc": "Polpo affumicato servito con salsa di peperoni arrostiti, patate rugose locali delle Canarie e olio alle erbe aromatiche.",
    "fs2_name": "Tataki di tonno rosso",
    "fs2_desc": "Tataki di tonno rosso scottato su letto di alghe wakame con salsa di anacardi tostati e crema all'aglio nero.",
    "fs3_name": "Filetto Di Branzino Selvatico",
    "fs3_desc": "Filetto di branzino fresco pescato in natura servito con sottili nastri di zucchine, purea di cavolfiore arrostito e pinoli.",
    "fs4_name": "Matrimonio",
    "fs4_desc": "Delicato abbinamento tra l'involtino di branzino con crema di parmigiano e l'involtino leggero di salmone con asparagi e prosciutto croccante, servito con purè di patate fatto in casa.",
    "fs5_name": "Filetto Di Salmone Con Caviale",
    "fs5_desc": "Filetto di salmone servito su teneri asparagi e riso, rifinito con una ricca salsa di parmigiano stagionato e caviale rosso.",
    "pr1_name": "Paella tradizionale El Molino Blanco",
    "pr1_desc": "Autentica paella in stile El Molino Blanco cucinata con coniglio, fagioli garrofó e fagiolini. Il prezzo è a persona, minimo 2 persone.",
    "pr2_name": "Paella di pesce e frutti di mare",
    "pr2_desc": "Paella di mare tradizionale spagnola con pesce fresco e crostacei misti. Il prezzo è a persona, minimo 2 persone.",
    "pr3_name": "Paella Di Riso Nero E Seppie",
    "pr3_desc": "Paella al nero di seppia cucinata con tenere seppie, gamberoni e cremosa alioli all'aglio. Il prezzo è a persona, minimo 2 persone.",
    "pr4_name": "Paella di verdure dell'orto",
    "pr4_desc": "Paella sana cucinata con ricche verdure di stagione e fagiolini. Il prezzo è a persona, minimo 2 persone.",
    "pr5_name": "Risotto Nero Ai Frutti Di Mare",
    "pr5_desc": "Ricco e cremoso risotto al nero di seppia con frutti di mare freschi assortiti.",
    "pr6_name": "Risotto ai funghi bianchi selvatici",
    "pr6_desc": "Cremoso risotto ai funghi bianchi di bosco rifinito con noci croccanti e profumato olio al tartufo bianco.",
    "km1_name": "Hamburger di pollo",
    "km1_desc": "Hamburger di pollo servito con formaggio e patatine fritte.",
    "km2_name": "Pasta cremosa al bacon",
    "km2_desc": "Pasta cotta con salsa di panna e pancetta.",
    "km3_name": "Nuggets di pollo",
    "km3_desc": "Bocconcini di pollo croccanti serviti con patatine fritte.",
    "km4_name": "Strisce Di Pesce",
    "km4_desc": "Straccetti di pesce dorati serviti con verdure miste e patatine fritte.",
    "ds1_name": "Fragole Flambé Al Pepe Verde",
    "ds1_desc": "Dolci fragole flambé al pepe verde. Il prezzo è a persona, minimo 2 persone.",
    "ds2_name": "Crepes Suzette Flambé",
    "ds2_desc": "Classiche crêpes francesi Suzette flambé. Il prezzo è a persona, minimo 2 persone.",
    "ds3_name": "Flambé di banane",
    "ds3_desc": "Banane flambé sulla tua tavola. Il prezzo è a persona, minimo 2 persone.",
    "ds4_name": "Flambé di pesca con whisky",
    "ds4_desc": "Pesca dolce flambata al whisky. Il prezzo è a persona, minimo 2 persone.",
    "ds5_name": "Tiramisù al pistacchio",
    "ds5_desc": "Tiramisù tradizionale ricoperto da una ricca crema al pistacchio.",
    "ds6_name": "Panna Cotta all'Arancia e Cointreau",
    "ds6_desc": "Panna cotta cremosa all'arancia e liquore Cointreau, servita con frutta fresca di stagione.",
    "ds7_name": "Cheesecake Basco",
    "ds7_desc": "Cheesecake basco al forno con nocciole tostate, banana locale delle Canarie e liquore alla nocciola Frangelico.",
    "ds8_name": "Millefoglie di lamponi e cioccolato bianco",
    "ds8_desc": "Croccante pasta sfoglia ricoperta di lamponi freschi, mascarpone e crema al cioccolato bianco.",
    "ds9_name": "Coulant al cioccolato",
    "ds9_desc": "Tortino dal cuore caldo al cioccolato servito con una pallina di gelato alla vaniglia.",
    "ds10_name": "Gelato a tre gusti",
    "ds10_desc": "Selezione di tre gusti di gelato serviti con panna fresca montata."
  }
};

const drinkTranslations: Record<string, Record<string, string>> = {
  ru: {
    "amaretto_sour_name": "Амаретто Сауэр",
    "amaretto_sour_desc": "Амаретто, лимонный сок, яичный белок, сахар",
    "caipirinha_name": "Кайпиринья",
    "caipirinha_desc": "Кашаса, лайм, сахар",
    "daiquiri_name": "Дайкири",
    "daiquiri_desc": "Белый ром, лимон, сахарный сироп",
    "long_island_ice_tea_name": "Ледяной чай Лонг-Айленда",
    "long_island_ice_tea_desc": "Джин, Ром, Текила, Водка, Трипл Сек, лимонный сок, сахар, Кока-Кола",
    "margarita_mango__peach_name": "Маргарита (Манго/Персик)",
    "margarita_mango__peach_desc": "Текила Сильвер, трипл сек, сок лайма",
    "mojito_classic__strawberry_name": "Мохито (Классический/Клубничный)",
    "mojito_classic__strawberry_desc": "Белый ром, сок лайма, свежая мята, сахар, содовая",
    "pina_colada_name": "Пина Колада",
    "pina_colada_desc": "Белый ром, кокосовый ликер, кокосовые сливки, ананасовый сок",
    "clover_club_name": "Клевер Клуб",
    "clover_club_desc": "Джин, сухой вермут, малиновый сироп, лимон, яичный белок",
    "mai_tai_name": "Май Тай",
    "mai_tai_desc": "Белый ром, Куантро, лимон, миндальный сироп, сахарный сироп",
    "passion_star_martini_name": "Звезда страсти Мартини",
    "passion_star_martini_desc": "Водка, ликер маракуйи, пюре маракуйи, лимон, ванильный сироп, игристая шот",
    "whiskey_sour_name": "Виски Сауэр",
    "whiskey_sour_desc": "Виски, лимонный сок, яичный белок, сахарный сироп",
    "brandy_alexander_name": "Бренди Александр",
    "brandy_alexander_desc": "Бренди, Бейлис, какао-ликер, сливки",
    "tunika_shot_name": "Туника (Выстрел)",
    "tunika_shot_desc": "Самбука, табаско, белая текила",
    "aperol_spritz_name": "Апероль Спритц",
    "aperol_spritz_desc": "Кава, Апероль, содовая",
    "bellini_name": "Беллини",
    "bellini_desc": "Кава, Арчерс, персиковое пюре",
    "dry_martini_name": "Сухой Мартини",
    "dry_martini_desc": "Джин, сухой мартини, цедра лимона или оливки",
    "mimosa_name": "мимоза",
    "mimosa_desc": "Кава, апельсиновый сок",
    "bloody_mary_name": "Кровавая Мэри",
    "bloody_mary_desc": "Водка, томатный сок, лимонный сок, соус Вустершир, Табаско, соль и перец",
    "bramble_name": "Брамбл",
    "bramble_desc": "Джин, ежевичный ликер, лимонный сок, сахар",
    "cosmopolitan_name": "Космополитен",
    "cosmopolitan_desc": "Водка, трипл сек, лимонный сок, клюквенный морс",
    "negroni_name": "Негрони",
    "negroni_desc": "Джин, Кампари, Мартини Россо",
    "espresso_martini_name": "Эспрессо Мартини",
    "espresso_martini_desc": "Водка, кофейный ликер, эспрессо, сахар",
    "french_martini_name": "Французский Мартини",
    "french_martini_desc": "Smirnoff Водка, малиновый ликер, ананасовый сок",
    "pia_colada_non_alcoholic_name": "Пинья Колада (безалкогольный)",
    "pia_colada_non_alcoholic_desc": "Ананасовый сок, кокосовые сливки, сахар.",
    "san_francisco_name": "Сан-Франциско",
    "san_francisco_desc": "Апельсиновый сок, ананасовый сок, гренадин",
    "mojito_non_alcoholic_name": "Мохито (Безалкогольный)",
    "mojito_non_alcoholic_desc": "Лайм, сахар, свежая мята, содовая",
    "passion_fruit_name": "Маракуйя",
    "passion_fruit_desc": "Ананасовый сок, маракуйя, лимон",
    "black_russian_name": "Черный русский",
    "black_russian_desc": "Водка, кофейный ликер",
    "white_russian_name": "Белый русский",
    "white_russian_desc": "Водка, кофейный ликер, сливки",
    "long_black_russian_name": "Длинный черный русский",
    "long_black_russian_desc": "Smirnoff Vodka, кофейный ликер, наполненный кока-колой."
  },
  de: {
    "amaretto_sour_name": "Amaretto Sauer",
    "amaretto_sour_desc": "Amaretto, Zitronensaft, Eiweiß, Zucker",
    "caipirinha_name": "Caipirinha",
    "caipirinha_desc": "Cachaça, Limette, Zucker",
    "daiquiri_name": "Daiquiri",
    "daiquiri_desc": "Weißer Rum, Zitrone, Zuckersirup",
    "long_island_ice_tea_name": "Long Island-Eistee",
    "long_island_ice_tea_desc": "Gin, Rum, Tequila, Wodka, Triple Sec, Zitronensaft, Zucker, Coca-Cola",
    "margarita_mango__peach_name": "Margarita (Mango / Pfirsich)",
    "margarita_mango__peach_desc": "Tequila Silver, Triple Sec, Limettensaft",
    "mojito_classic__strawberry_name": "Mojito (Klassisch / Erdbeere)",
    "mojito_classic__strawberry_desc": "Weißer Rum, Limettensaft, frische Minze, Zucker, Soda",
    "pina_colada_name": "Pina Colada",
    "pina_colada_desc": "Weißer Rum, Kokoslikör, Kokoscreme, Ananassaft",
    "clover_club_name": "Clover Club",
    "clover_club_desc": "Gin, trockener Wermut, Himbeersirup, Zitrone, Eiweiß",
    "mai_tai_name": "Mai Tai",
    "mai_tai_desc": "Weißer Rum, Cointreau, Zitrone, Mandelsirup, Zuckersirup",
    "passion_star_martini_name": "Passion Star Martini",
    "passion_star_martini_desc": "Wodka, Passionsfruchtlikör, Passionsfruchtpüree, Zitrone, Vanillesirup, prickelnder Shot",
    "whiskey_sour_name": "Whiskey Sour",
    "whiskey_sour_desc": "Whisky, Zitronensaft, Eiweiß, Zuckersirup",
    "brandy_alexander_name": "Brandy Alexander",
    "brandy_alexander_desc": "Brandy, Baileys, Kakaolikör, Sahne",
    "tunika_shot_name": "Tunika (Schuss)",
    "tunika_shot_desc": "Sambuca, ein Schuss Tabasco, weißer Tequila",
    "aperol_spritz_name": "Aperol Spritz",
    "aperol_spritz_desc": "Cava, Aperol, Limonade",
    "bellini_name": "Bellini",
    "bellini_desc": "Cava, Archers, Pfirsichpüree",
    "dry_martini_name": "Trockener Martini",
    "dry_martini_desc": "Gin, trockener Martini, Zitronenschale oder Oliven",
    "mimosa_name": "Mimose",
    "mimosa_desc": "Cava, Orangensaft",
    "bloody_mary_name": "Bloody Mary",
    "bloody_mary_desc": "Wodka, Tomatensaft, Zitronensaft, Worcestershire-Sauce, Tabasco, Salz und Pfeffer",
    "bramble_name": "Brombeere",
    "bramble_desc": "Gin, Brombeerlikör, Zitronensaft, Zucker",
    "cosmopolitan_name": "Kosmopolitisch",
    "cosmopolitan_desc": "Wodka, Triple Sec, Zitronensaft, Cranberrysaft",
    "negroni_name": "Negroni",
    "negroni_desc": "Gin, Campari, Martini Rosso",
    "espresso_martini_name": "Espresso-Martini",
    "espresso_martini_desc": "Wodka, Kaffeelikör, Espresso, Zucker",
    "french_martini_name": "Französischer Martini",
    "french_martini_desc": "Smirnoff Vodka, Himbeerlikör, Ananassaft",
    "pia_colada_non_alcoholic_name": "Piña Colada (alkoholfrei)",
    "pia_colada_non_alcoholic_desc": "Ananassaft, Kokoscreme, Zucker",
    "san_francisco_name": "San Francisco",
    "san_francisco_desc": "Orangensaft, Ananassaft, Grenadine",
    "mojito_non_alcoholic_name": "Mojito (alkoholfrei)",
    "mojito_non_alcoholic_desc": "Limette, Zucker, frische Minze, Soda",
    "passion_fruit_name": "Passionsfrucht",
    "passion_fruit_desc": "Ananassaft, Passionsfrucht, Zitrone",
    "black_russian_name": "Schwarzer Russe",
    "black_russian_desc": "Wodka, Kaffeelikör",
    "white_russian_name": "Weißrusse",
    "white_russian_desc": "Wodka, Kaffeelikör, Sahne",
    "long_black_russian_name": "Langer schwarzer Russe",
    "long_black_russian_desc": "Smirnoff Vodka, Kaffeelikör, gefüllt mit Coca-Cola"
  },
  fr: {
    "amaretto_sour_name": "Amaretto aigre",
    "amaretto_sour_desc": "Amaretto, jus de citron, blanc d'oeuf, sucre",
    "caipirinha_name": "Caïpirinha",
    "caipirinha_desc": "Cachaça, citron vert, sucre",
    "daiquiri_name": "Daïquiri",
    "daiquiri_desc": "Rhum blanc, citron, sirop de sucre",
    "long_island_ice_tea_name": "Thé glacé de Long Island",
    "long_island_ice_tea_desc": "Gin, Rhum, Tequila, Vodka, Triple Sec, jus de citron, sucre, Coca-Cola",
    "margarita_mango__peach_name": "Margarita (Mangue / Pêche)",
    "margarita_mango__peach_desc": "Tequila silver, triple sec, jus de citron vert",
    "mojito_classic__strawberry_name": "Mojito (Classique / Fraise)",
    "mojito_classic__strawberry_desc": "Rhum blanc, jus de citron vert, menthe fraîche, sucre, soda",
    "pina_colada_name": "Pina Colada",
    "pina_colada_desc": "Rhum blanc, liqueur de coco, crème de coco, jus d'ananas",
    "clover_club_name": "Club du Trèfle",
    "clover_club_desc": "Gin, vermouth sec, sirop de framboise, citron, blanc d'oeuf",
    "mai_tai_name": "Mai Tai",
    "mai_tai_desc": "Rhum blanc, Cointreau, citron, sirop d'amande, sirop de sucre",
    "passion_star_martini_name": "Passion Star Martini",
    "passion_star_martini_desc": "Vodka, liqueur de fruit de la passion, purée de fruit de la passion, citron, sirop de vanille, shot pétillant",
    "whiskey_sour_name": "Whisky Sour",
    "whiskey_sour_desc": "Whisky, jus de citron, blanc d'oeuf, sirop de sucre",
    "brandy_alexander_name": "Brandy Alexandre",
    "brandy_alexander_desc": "Brandy, Baileys, liqueur de cacao, crème",
    "tunika_shot_name": "Tunika (Tir)",
    "tunika_shot_desc": "Sambuca, trait de Tabasco, Tequila blanche",
    "aperol_spritz_name": "Aperol Spritz",
    "aperol_spritz_desc": "Cava, Aperol, soda",
    "bellini_name": "Bellini",
    "bellini_desc": "Cava, Archers, purée de pêche",
    "dry_martini_name": "Martini sec",
    "dry_martini_desc": "Gin, dry Martini, zeste de citron ou olives",
    "mimosa_name": "Mimosas",
    "mimosa_desc": "Cava, jus d'orange",
    "bloody_mary_name": "Marie sanglante",
    "bloody_mary_desc": "Vodka, jus de tomate, jus de citron, sauce Worcestershire, Tabasco, sel & poivre",
    "bramble_name": "Ronce",
    "bramble_desc": "Gin, liqueur de mûre, jus de citron, sucre",
    "cosmopolitan_name": "Cosmopolite",
    "cosmopolitan_desc": "Vodka, triple sec, jus de citron, jus de canneberge",
    "negroni_name": "Négroni",
    "negroni_desc": "Gin, Campari, Martini Rosso",
    "espresso_martini_name": "Expresso Martini",
    "espresso_martini_desc": "Vodka, liqueur de café, expresso, sucre",
    "french_martini_name": "Martini français",
    "french_martini_desc": "Vodka Smirnoff, liqueur de framboise, jus d'ananas",
    "pia_colada_non_alcoholic_name": "Piña Colada (sans alcool)",
    "pia_colada_non_alcoholic_desc": "Jus d'ananas, crème de coco, sucre",
    "san_francisco_name": "San Francisco",
    "san_francisco_desc": "Jus d'orange, jus d'ananas, grenadine",
    "mojito_non_alcoholic_name": "Mojito (sans alcool)",
    "mojito_non_alcoholic_desc": "Citron vert, sucre, menthe fraîche, soda",
    "passion_fruit_name": "Fruit de la passion",
    "passion_fruit_desc": "Jus d'ananas, fruit de la passion, citron",
    "black_russian_name": "Russe noir",
    "black_russian_desc": "Vodka, liqueur de café",
    "white_russian_name": "Russe blanc",
    "white_russian_desc": "Vodka, liqueur de café, crème",
    "long_black_russian_name": "Longue Russe Noire",
    "long_black_russian_desc": "Vodka Smirnoff, liqueur de café, remplie de Coca-Cola"
  },
  it: {
    "amaretto_sour_name": "Amaretto acido",
    "amaretto_sour_desc": "Amaretto, succo di limone, albume, zucchero",
    "caipirinha_name": "Caipirinha",
    "caipirinha_desc": "Cachaça, lime, zucchero",
    "daiquiri_name": "Daiquiri",
    "daiquiri_desc": "Rum bianco, limone, sciroppo di zucchero",
    "long_island_ice_tea_name": "Tè freddo di Long Island",
    "long_island_ice_tea_desc": "Gin, Rum, Tequila, Vodka, Triple Sec, succo di limone, zucchero, Coca-Cola",
    "margarita_mango__peach_name": "Margarita (mango/pesca)",
    "margarita_mango__peach_desc": "Tequila silver, triple sec, succo di lime",
    "mojito_classic__strawberry_name": "Mojito (Classico/Fragola)",
    "mojito_classic__strawberry_desc": "Rum bianco, succo di lime, menta fresca, zucchero, soda",
    "pina_colada_name": "Pina Colada",
    "pina_colada_desc": "Rum bianco, liquore al cocco, crema al cocco, succo d'ananas",
    "clover_club_name": "Club del trifoglio",
    "clover_club_desc": "Gin, vermut secco, sciroppo di lamponi, limone, albume",
    "mai_tai_name": "Mai Tai",
    "mai_tai_desc": "Rum bianco, Cointreau, limone, sciroppo di mandorle, sciroppo di zucchero",
    "passion_star_martini_name": "Passione Stella Martini",
    "passion_star_martini_desc": "Vodka, liquore al frutto della passione, purea di frutto della passione, limone, sciroppo di vaniglia, shot frizzante",
    "whiskey_sour_name": "Whisky acido",
    "whiskey_sour_desc": "Whisky, succo di limone, albume d'uovo, sciroppo di zucchero",
    "brandy_alexander_name": "Brandy Alessandro",
    "brandy_alexander_desc": "Brandy, Baileys, liquore al cacao, panna",
    "tunika_shot_name": "Tunika (inquadratura)",
    "tunika_shot_desc": "Sambuca, un pizzico di Tabasco, Tequila bianca",
    "aperol_spritz_name": "Aperol Spritz",
    "aperol_spritz_desc": "Cava, Aperol, soda",
    "bellini_name": "Bellini",
    "bellini_desc": "Cava, Arcieri, purea di pesche",
    "dry_martini_name": "Martini secco",
    "dry_martini_desc": "Gin, Martini dry, scorza di limone o olive",
    "mimosa_name": "Mimosa",
    "mimosa_desc": "Cava, succo d'arancia",
    "bloody_mary_name": "Maria sanguinaria",
    "bloody_mary_desc": "Vodka, succo di pomodoro, succo di limone, salsa Worcestershire, tabasco, sale e pepe",
    "bramble_name": "Rovo",
    "bramble_desc": "Gin, liquore alla mora, succo di limone, zucchero",
    "cosmopolitan_name": "Cosmopolita",
    "cosmopolitan_desc": "Vodka, triple sec, succo di limone, succo di mirtillo rosso",
    "negroni_name": "Negroni",
    "negroni_desc": "Gin, Campari, Martini Rosso",
    "espresso_martini_name": "Espresso Martini",
    "espresso_martini_desc": "Vodka, liquore al caffè, caffè espresso, zucchero",
    "french_martini_name": "Martini francese",
    "french_martini_desc": "Smirnoff Vodka, liquore al lampone, succo d'ananas",
    "pia_colada_non_alcoholic_name": "Piña Colada (analcolica)",
    "pia_colada_non_alcoholic_desc": "Succo d'ananas, crema di cocco, zucchero",
    "san_francisco_name": "San Francisco",
    "san_francisco_desc": "Succo d'arancia, succo d'ananas, granatina",
    "mojito_non_alcoholic_name": "Mojito (analcolico)",
    "mojito_non_alcoholic_desc": "Lime, zucchero, menta fresca, soda",
    "passion_fruit_name": "Frutto della passione",
    "passion_fruit_desc": "Succo di ananas, frutto della passione, limone",
    "black_russian_name": "Russo Nero",
    "black_russian_desc": "Vodka, liquore al caffè",
    "white_russian_name": "Russo bianco",
    "white_russian_desc": "Vodka, liquore al caffè, panna",
    "long_black_russian_name": "Russo nero lungo",
    "long_black_russian_desc": "Smirnoff Vodka, liquore al caffè, ripieno di Coca-Cola"
  }
};


const getMenuItemName = (item: MenuItem, lang: string) => {
  const custom = dishTranslations[lang]?.[item.id + "_name"];
  if (custom) return custom;
  if (lang === "es") return item.nameEs;
  return item.nameEn;
};

const getMenuItemDescription = (item: MenuItem, lang: string) => {
  const custom = dishTranslations[lang]?.[item.id + "_desc"];
  if (custom) return custom;
  if (lang === "es") return item.descriptionEs;
  return item.descriptionEn;
};

const getDrinkItemName = (item: DrinkItem, lang: string) => {
  const slug = item.nameEn.toLowerCase().replace(/ /g, "_").replace(/&/g, "_").replace(/-/g, "_").replace(/'/g, "_").replace(/[^a-z0-9_]/g, "");
  const custom = drinkTranslations[lang]?.[slug + "_name"];
  if (custom) return custom;
  if (lang === "es") return item.nameEs;
  return item.nameEn;
};

const getDrinkItemDescription = (item: DrinkItem, lang: string) => {
  if (!item.descriptionEn) return "";
  const slug = item.nameEn.toLowerCase().replace(/ /g, "_").replace(/&/g, "_").replace(/-/g, "_").replace(/'/g, "_").replace(/[^a-z0-9_]/g, "");
  const custom = drinkTranslations[lang]?.[slug + "_desc"];
  if (custom) return custom;
  if (lang === "es") return item.descriptionEs || "";
  return item.descriptionEn;
};

const getDrinkCategoryName = (categoryEn: string, lang: string) => {
  const key = categoryEn.toLowerCase().replace(/ /g, "_").replace(/&/g, "_").replace(/-/g, "_").replace(/[^a-z0-9_]/g, "");
  const custom = translations[lang]?.[`drink_cat_${key}`];
  if (custom) return custom;
  return categoryEn;
};


const GALLERY_ITEMS = [
  { id: 1, src: "/photos/IMG_1528.JPG", type: "image", aspect: "aspect-[4/3]", span: "lg:col-span-6" },
  { id: 2, src: "/photos/IMG_1536.JPG", type: "image", aspect: "aspect-[4/3]", span: "lg:col-span-6" },
  { id: 3, src: "/photos/IMG_1537.JPG", type: "image", aspect: "aspect-[3/4]", span: "lg:col-span-4" },
  { id: 4, src: "/photos/IMG_1538.MP4", type: "video", aspect: "aspect-[3/4]", span: "lg:col-span-4" },
  { id: 5, src: "/photos/IMG_1541.JPG", type: "image", aspect: "aspect-[3/4]", span: "lg:col-span-4" },
  { id: 6, src: "/photos/IMG_1551.JPG", type: "image", aspect: "aspect-[4/3]", span: "lg:col-span-6" },
  { id: 7, src: "/photos/IMG_1554.JPG", type: "image", aspect: "aspect-[4/3]", span: "lg:col-span-6" }
] as const;

const bookingUrl = "https://www.google.com/maps/reserve/v/dine/c/zxYwb6CV1Ys?source=pa&opi=79508299&hl=en&gei=WCgbao_LEuyZ1fIPmsKasQo&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Den%26pb%3D!1m14!1s0xc6a975ecaa496e7:0xaaeaf88b0766c71f!3m12!1m3!1d11990.25596208906!2d69.2758336!3d41.2965909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!12m4!2m3!1i360!2i120!4i8!13m65!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m16!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m3!1sPicbaoiBGOqRwPAPvo38cA!7e81!15i10112!15m132!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m2!3e1!3e1!17b1!20m4!1e3!1e6!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m1!1b1!61m4!1m1!1e1!1m1!1e1!65m9!3m8!1m3!1m2!1i224!2i298!1m3!1m2!1i224!2i298!72m35!1m10!2b1!5b1!7b1!12m6!1b1!2b1!4m1!1e1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m4!1m1!1e2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b0!21m28!1m6!1m2!1e3!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i780!39sEl%2BMolino%2BBlanco%26q%3DEl%2BMolino%2BBlanco,%2BAv.%2BAustria,%2B5,%2B38660%2BCosta%2BAdeje,%2BSanta%2BCruz%2Bde%2BTenerife";

const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "ru", label: "RU" },
    { code: "de", label: "DE" },
    { code: "fr", label: "FR" },
    { code: "it", label: "IT" }
  ] as const;

export default function Home() {
  const [locale, setLocale] = useState<"en" | "es" | "ru" | "de" | "fr" | "it">("en");
  const [activeCategory, setActiveCategory] = useState<MenuItem["category"]>("cold_starters");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [activeDrinkTab, setActiveDrinkTab] = useState<"classics" | "aperitifs_digestifs" | "non_alcoholic">("classics");
  
  // Form Reservation State
  const [reservationName, setReservationName] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [reservationGuests, setReservationGuests] = useState("2");
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [resCode, setResCode] = useState("");

  // Premium Windmill Intro Loader State
  const [isLoading, setIsLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  // Mobile Burger Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
  const [isSticky, setIsSticky] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGalleryIndex === null) return;
      if (e.key === "Escape") setActiveGalleryIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveGalleryIndex((prev) => (prev !== null ? (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1) : null));
      }
      if (e.key === "ArrowRight") {
        setActiveGalleryIndex((prev) => (prev !== null ? (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1) : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex]);

  // Timer-based loading sequence
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeLoader(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Handle scroll lock during loading state
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);



  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (c) => c.menuItem.id === item.id && 
        JSON.stringify(c.selectedAddOns) === JSON.stringify(selectedAddOns)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { menuItem: item, quantity: 1, selectedAddOns: [...selectedAddOns] }];
    });
    setSelectedAddOns([]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, diff: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + diff;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) => {
      if (prev.some((a) => a.id === addOn.id)) {
        return prev.filter((a) => a.id !== addOn.id);
      }
      return [...prev, addOn];
    });
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const basePrice = typeof item.menuItem.price === "number" ? item.menuItem.price : 0;
      const addOnsPrice = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
      return total + (basePrice + addOnsPrice) * item.quantity;
    }, 0);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName || !reservationDate || !reservationTime) return;

    const code = "EMB-" + Math.floor(1000 + Math.random() * 9000);
    setResCode(code);
    setReservationSuccess(true);
  };

  const resetReservation = () => {
    setReservationName("");
    setReservationDate("");
    setReservationTime("");
    setReservationGuests("2");
    setReservationSuccess(false);
    setIsReserveOpen(false);
  };

  const getDrinkTab = (categoryName: string): "classics" | "aperitifs_digestifs" | "non_alcoholic" => {
    if (["Classics", "Shots"].includes(categoryName)) {
      return "classics";
    }
    if (["Aperitifs", "Digestifs"].includes(categoryName)) {
      return "aperitifs_digestifs";
    }
    return "non_alcoholic";
  };

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-[#231912]/20">
      
      {/* Premium Gold Windmill Loader */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#16100c] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
            fadeLoader ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Hypnotic Spinning Golden Windmill */}
            <svg className="w-16 h-16 text-[#d4b986] animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
              <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
            
            {/* Elegant Luxury Labels */}
            <div className="text-center flex flex-col gap-1.5 animate-pulse-slow">
              <h1 className="font-serif text-2xl tracking-normal text-[#f5ecd5] uppercase">
                El Molino Blanco
              </h1>
              <p className="font-script text-base text-[#d4b986]">
                {translations[locale].loaderArtisanalCuisine}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. DYNAMIC NAVIGATION NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          (isSticky || isMenuOpen) 
            ? "bg-[#f5ecd5]/95 backdrop-blur-md border-b border-[#231912]/10 py-2.5" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo signature */}
          <a href="#" className="flex items-center group">
            <img
              src={(isSticky || isMenuOpen) ? "/logo-duotone.png?v=2" : "/logo-white.png?v=3"}
              alt="El Molino Blanco Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                isSticky ? "h-12 sm:h-[60px]" : "h-14 sm:h-[72px]"
              }`}
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-550 ${
              (isSticky || isMenuOpen) ? "text-[#231912] hover:text-[#231912]/75" : "text-white/90 hover:text-white"
            }`}>
              {translations[locale].navBookTable}
            </a>
            <a href="#menu" className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-550 ${
              (isSticky || isMenuOpen) ? "text-[#231912] hover:text-[#231912]/75" : "text-white/90 hover:text-white"
            }`}>
              {translations[locale].navMenu}
            </a>
            <a href="#bar" className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-550 ${
              (isSticky || isMenuOpen) ? "text-[#231912] hover:text-[#231912]/75" : "text-white/90 hover:text-white"
            }`}>
              {translations[locale].navBarCard}
            </a>
            <a href="#gallery" className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-550 ${
              (isSticky || isMenuOpen) ? "text-[#231912] hover:text-[#231912]/75" : "text-white/90 hover:text-white"
            }`}>
              {translations[locale].navGallery}
            </a>
            <a href="#contacts" className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-550 ${
              (isSticky || isMenuOpen) ? "text-[#231912] hover:text-[#231912]/75" : "text-white/90 hover:text-white"
            }`}>
              {translations[locale].navFindUs}
            </a>
          </nav>

          {/* Booking & Cart Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Language Selector Desktop — Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  (isSticky || isMenuOpen)
                    ? "border-[#231912]/15 text-[#231912] hover:border-[#231912]/30"
                    : "border-white/20 text-white/90 hover:border-white/40"
                }`}
              >
                {locale.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 bg-[#f5ecd5] border border-[#231912]/12 rounded-xl overflow-hidden min-w-[52px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code); setIsLangOpen(false); }}
                        className={`block w-full px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
                          locale === lang.code
                            ? "bg-[#231912] text-[#f5ecd5]"
                            : "text-[#231912]/70 hover:bg-[#231912]/5 hover:text-[#231912]"
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Instagram Link Outlined Button */}
            <a 
              href="https://www.instagram.com/elmolinoblanco?igsh=MTVtcnJxdXppOGt6Nw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hidden lg:inline-flex px-5 py-2 rounded-full border text-[11px] font-bold font-sans tracking-[0.14em] uppercase transition-all duration-300 ${
                (isSticky || isMenuOpen) 
                  ? "border-[#231912]/20 text-[#231912] hover:bg-[#231912]/5 hover:border-[#231912]" 
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white"
              }`}
            >
              {translations[locale].navInstagram}
            </a>

            {/* Email Link Outlined Button */}
            <a 
              href="mailto:info@restaurantemolinoblanco.com" 
              className={`hidden lg:inline-flex px-5 py-2 rounded-full border text-[11px] font-bold font-sans tracking-[0.14em] uppercase transition-all duration-300 ${
                (isSticky || isMenuOpen) 
                  ? "border-[#231912]/20 text-[#231912] hover:bg-[#231912]/5 hover:border-[#231912]" 
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white"
              }`}
            >
              {translations[locale].navEmail}
            </a>

            {/* Philosophy Main Action */}
            <a
              href="#about"
              className={`inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                (isSticky || isMenuOpen)
                  ? "bg-[#231912] text-[#f5ecd5] hover:bg-transparent hover:text-[#231912] border border-[#231912]"
                  : "bg-white text-stone-950 hover:bg-transparent hover:text-white border border-white"
              }`}
            >
              {translations[locale].navPhilosophy}
            </a>

            {/* Mobile Menu Burger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative p-2.5 rounded-full border transition-all md:hidden z-50 ${
                isMenuOpen
                  ? "border-[#231912]/20 text-[#231912] hover:bg-[#231912]/5"
                  : isSticky 
                    ? "border-[#231912]/15 hover:bg-[#231912]/5 text-[#231912]" 
                    : "border-white/20 hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Slide in from left) */}
      <div 
        className={`fixed inset-0 z-40 bg-[#f5ecd5] flex flex-col justify-between pt-32 pb-12 px-8 transition-transform duration-500 ease-in-out md:hidden paper-grain ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Luxury Corner Ornaments & Border Frame in Drawer */}
        <div className="absolute inset-4 pointer-events-none z-0 border border-[#231912]/10 rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        {/* Navigation links - Centered & Spacious (Ladurée style) */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-8 my-auto">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-[19px] sm:text-[22px] font-bold uppercase tracking-[0.15em] text-[#231912] hover:text-[#8c7853] transition-colors"
          >
            {translations[locale].navBookTable}
          </a>
          <a
            href="#menu"
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-[19px] sm:text-[22px] font-bold uppercase tracking-[0.15em] text-[#231912] hover:text-[#8c7853] transition-colors"
          >
            {translations[locale].navMenu}
          </a>
          <a 
            href="#bar" 
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-[19px] sm:text-[22px] font-bold uppercase tracking-[0.15em] text-[#231912] hover:text-[#8c7853] transition-colors"
          >
            {translations[locale].navBarCard}
          </a>
          <a 
            href="#gallery" 
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-[19px] sm:text-[22px] font-bold uppercase tracking-[0.15em] text-[#231912] hover:text-[#8c7853] transition-colors"
          >
            {translations[locale].navGallery}
          </a>
          <a 
            href="#contacts" 
            onClick={() => setIsMenuOpen(false)}
            className="font-sans text-[19px] sm:text-[22px] font-bold uppercase tracking-[0.15em] text-[#231912] hover:text-[#8c7853] transition-colors"
          >
            {translations[locale].navFindUs}
          </a>
        </div>

        {/* Footer controls inside drawer */}
        <div className="relative z-10 flex flex-col items-center gap-6 mt-auto">
          
          {/* Language Toggle for Mobile — Dropdown */}
          <div className="relative z-10">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#231912]/15 text-[11px] font-bold tracking-widest uppercase text-[#231912] hover:border-[#231912]/30 transition-all duration-300"
            >
              {locale.toUpperCase()}
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#f5ecd5] border border-[#231912]/12 rounded-xl overflow-hidden min-w-[60px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setIsLangOpen(false); }}
                    className={`block w-full px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                      locale === lang.code
                        ? "bg-[#231912] text-[#f5ecd5]"
                        : "text-[#231912]/70 hover:bg-[#231912]/5 hover:text-[#231912]"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Centered Windmill Divider */}
          <div className="flex items-center justify-center w-full">
            <div className="w-10 h-[1px] bg-[#231912]/15" />
            <svg className="w-5 h-5 mx-3 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
              <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
            <div className="w-10 h-[1px] bg-[#231912]/15" />
          </div>

          {/* Philosophy Action */}
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="px-8 py-3 rounded-full bg-[#231912] text-[#f5ecd5] font-sans text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#8c7853] transition-all"
          >
            {translations[locale].navPhilosophy}
          </a>

          {/* Socials row */}
          <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[#231912]/50">
            <a href="https://www.instagram.com/elmolinoblanco?igsh=MTVtcnJxdXppOGt6Nw==" target="_blank" rel="noopener noreferrer" className="hover:text-[#231912] transition-colors">{translations[locale].navInstagram}</a>
            <span>•</span>
            <a href="mailto:info@restaurantemolinoblanco.com" className="hover:text-[#231912] transition-colors">{translations[locale].navEmail}</a>
          </div>
        </div>
      </div>

      {/* 2. REFINED PREMIUM FULL-BLEED HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-stone-950">
        
        {/* Full-bleed background image with elegant overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/hero1.JPG"
            alt="El Molino Blanco Gourmet Cuisine Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-102 transition-transform duration-10000 ease-out brightness-[0.45]"
          />
          {/* Elegant Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1611] via-stone-950/40 to-stone-950/65" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#16100c]/90" />
        </div>

        {/* Delicate Luxury Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-20 border border-[#f5ecd5]/18 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-3 left-3 w-8 h-8 text-[#d4b986]/70" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-3 right-3 w-8 h-8 text-[#d4b986]/70 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-3 left-3 w-8 h-8 text-[#d4b986]/70 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-8 h-8 text-[#d4b986]/70 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        {/* Cinematic Content Grid */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center text-[#f5ecd5] flex flex-col items-center justify-center">
          
          {/* Live music badge */}
          <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] sm:text-[11px] font-bold font-sans tracking-widest text-[#d4b986] uppercase select-none animate-pulse-slow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b986] animate-ping" />
            {translations[locale].heroLiveMusic}
          </div>

          {/* Elegant script logo matching the cursive style */}
          <h2 className="font-script text-5xl sm:text-6xl lg:text-7xl text-white mb-2 drop-shadow-md select-none animate-float">
            {translations[locale].heroTitle}
          </h2>

          {/* Cursive Tagline (thin and compact) */}
          <p className="font-serif italic text-xl sm:text-2xl font-light text-stone-200/90 mb-8 drop-shadow-lg select-none animate-fade-in-up tracking-wide">
            {translations[locale].heroTagline}
          </p>

          {/* Clean minimal buttons tray (3 outlined buttons just like in their screenshot) */}
          <div className="flex flex-wrap gap-3.5 items-center justify-center animate-fade-in-up select-none">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] font-bold font-sans tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all"
            >
              {translations[locale].navBookTable}
            </a>
            <a
              href="#menu"
              className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] font-bold font-sans tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all"
            >
              {translations[locale].navMenu}
            </a>
            <a
              href="#contacts"
              className="px-6 py-2.5 rounded-full border border-white/20 text-[11px] font-bold font-sans tracking-widest uppercase hover:bg-white/10 hover:border-white transition-all"
            >
              {translations[locale].navFindUs}
            </a>
          </div>

          {/* Mouse Scroll indicator with warm luxury tones */}
          <div className="flex flex-col items-center gap-2 animate-bounce mt-16 select-none">
            <span className="font-serif text-[9px] uppercase tracking-[0.2em] text-[#f5ecd5]/40">
              Scroll
            </span>
            <div className="w-5 h-9 rounded-full border border-[#f5ecd5]/25 flex justify-center p-1.5">
              <div className="w-1 h-2.5 rounded-full bg-[#d4b986] animate-pulse-slow" />
            </div>
          </div>

        </div>

      </section>

      {/* 3. PHILOSOPHY SECTION — Clean Compact Editorial */}
      <section id="about" className="relative py-8 sm:py-12 lg:py-16 bg-[#f5ecd5]">
        
        {/* Elegant Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-8 sm:px-12 pt-8 pb-8 sm:pt-0 sm:pb-0 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-10 lg:gap-16 items-center">
            
            {/* Text — left side */}
            <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 text-left">
              
              <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
                {translations[locale].storyHeader}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
                {translations[locale].storyTitle}
              </h2>

              <div className="w-12 h-[1.5px] bg-[#8c7853]" />

              <div className="flex flex-col gap-3 text-[#231912]/75 font-sans text-sm sm:text-base font-light leading-relaxed max-w-lg">
                <p>{translations[locale].storyParagraph1}</p>
                <p>{translations[locale].storyParagraph2}</p>
                <p>{translations[locale].storyParagraph3}</p>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-[#8c7853]/40 pl-4 sm:pl-5 py-1.5 sm:py-2">
                <p className="font-serif text-base sm:text-lg italic text-[#231912]/85 leading-snug">
                  &ldquo;{translations[locale].storyQuote}&rdquo;
                </p>
                <span className="font-sans text-[10px] font-bold tracking-[0.14em] text-[#231912]/40 uppercase mt-2 sm:mt-3 block">
                  {translations[locale].storyQuoteAuthor}
                </span>
              </div>

            </div>

            {/* Photo — right side, clean and adaptive aspect ratio */}
            <div className="relative w-[92%] mx-auto sm:w-full sm:mx-0 aspect-[3/4] sm:aspect-[4/3] md:aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/photos/story_quixote.jpg"
                alt="Don Quixote statue in the garden of El Molino Blanco with the windmill behind"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_35%]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 PHILOSOPHY — Rounded Strip with Animations */}
      <section className="py-4 sm:py-6 bg-[#f5ecd5]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="relative bg-[#231912] rounded-2xl sm:rounded-3xl py-6 px-5 sm:py-8 sm:px-8 lg:py-10 lg:px-16 overflow-hidden">
            
            {/* Subtle gold line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8c7853] to-transparent animate-pulse-slow" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-0">
              
              {/* Pillar 1 */}
              <div className="group flex flex-col items-center text-center px-2 sm:px-4 lg:px-10 py-2.5 sm:py-4 rounded-2xl transition-all duration-500 hover:bg-[#f5ecd5]/[0.04] cursor-default md:border-r md:border-[#f5ecd5]/[0.07]">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-[#8c7853]/30 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:border-[#8c7853] group-hover:scale-110 transition-all duration-500">
                  <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#8c7853] group-hover:text-[#d4b986] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <span className="font-serif text-sm sm:text-base font-bold text-[#f5ecd5] uppercase tracking-wider group-hover:text-[#d4b986] transition-colors duration-550">{translations[locale].pillarHonestTitle}</span>
                <p className="font-sans text-[11px] sm:text-xs text-[#f5ecd5]/40 mt-1 sm:mt-2.5 leading-relaxed max-w-[220px] group-hover:text-[#f5ecd5]/60 transition-colors duration-550">
                  {translations[locale].pillarHonestDesc}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="group flex flex-col items-center text-center px-2 sm:px-4 lg:px-10 py-2.5 sm:py-4 rounded-2xl transition-all duration-500 hover:bg-[#f5ecd5]/[0.04] cursor-default md:border-r md:border-[#f5ecd5]/[0.07]">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-[#8c7853]/30 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:border-[#8c7853] group-hover:scale-110 transition-all duration-500">
                  <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#8c7853] group-hover:text-[#d4b986] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 10l12-3" />
                    <circle cx="6" cy="19" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <span className="font-serif text-sm sm:text-base font-bold text-[#f5ecd5] uppercase tracking-wider group-hover:text-[#d4b986] transition-colors duration-550">{translations[locale].pillarMusicTitle}</span>
                <p className="font-sans text-[11px] sm:text-xs text-[#f5ecd5]/40 mt-1 sm:mt-2.5 leading-relaxed max-w-[220px] group-hover:text-[#f5ecd5]/60 transition-colors duration-550">
                  {translations[locale].pillarMusicDesc}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="group flex flex-col items-center text-center px-2 sm:px-4 lg:px-10 py-2.5 sm:py-4 rounded-2xl transition-all duration-500 hover:bg-[#f5ecd5]/[0.04] cursor-default">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-[#8c7853]/30 flex items-center justify-center mb-2.5 sm:mb-4 group-hover:border-[#8c7853] group-hover:scale-110 transition-all duration-500">
                  <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#8c7853] group-hover:text-[#d4b986] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <span className="font-serif text-sm sm:text-base font-bold text-[#f5ecd5] uppercase tracking-wider group-hover:text-[#d4b986] transition-colors duration-550">{translations[locale].pillarReturnTitle}</span>
                <p className="font-sans text-[11px] sm:text-xs text-[#f5ecd5]/40 mt-1 sm:mt-2.5 leading-relaxed max-w-[220px] group-hover:text-[#f5ecd5]/60 transition-colors duration-550">
                  {translations[locale].pillarReturnDesc}
                </p>
              </div>

            </div>

            {/* Subtle gold line at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8c7853] to-transparent animate-pulse-slow" />
          </div>
        </div>
      </section>

      {/* Elegant Windmill Section Divider */}
      <div className="flex items-center justify-center py-6 bg-[#f5ecd5] relative z-10 pointer-events-none select-none">
        <div className="w-16 h-[1px] bg-[#231912]/12" />
        <svg className="w-6 h-6 mx-4 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
          <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <div className="w-16 h-[1px] bg-[#231912]/12" />
      </div>

      {/* 3.8 SPACE & EVENTS SECTION */}
      <section id="spaces-events" className="py-10 lg:py-12 bg-[#f5ecd5] relative z-10">
        
        {/* Elegant Corner Ornaments & Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2 mb-8 text-left">
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
              {translations[locale].eventsHeader}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
              {translations[locale].eventsTitle}
            </h2>
            <p className="font-sans text-[10px] sm:text-[11px] text-[#8c7853] font-bold tracking-widest uppercase mt-0.5">
              {translations[locale].eventsSubtitle}
            </p>
            <div className="w-12 h-[1px] bg-[#8c7853] mt-2" />
          </div>

          {/* Grid Layout (Minimalist Columns with Border Dividers, Adaptive Responsive Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-[#231912]/12 md:divide-y-0 md:divide-x md:divide-[#231912]/12">
            
            {/* Col 1: About the Restaurant */}
            <div className="flex flex-col pb-6 md:pb-0 md:pr-6 lg:pr-8 text-left">
              <span className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8c7853] mb-3 block border-b border-[#231912]/10 pb-1.5">
                {translations[locale].eventsAboutTitle}
              </span>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#231912]/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsHoursOpen}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsMusicHours}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsCuisine}</span>
                </li>
              </ul>
            </div>

            {/* Col 2: Perfect For */}
            <div className="flex flex-col py-6 md:py-0 md:px-6 lg:px-8 text-left">
              <span className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8c7853] mb-3 block border-b border-[#231912]/10 pb-1.5">
                {translations[locale].eventsPerfectForTitle}
              </span>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#231912]/80">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsPerfectRomantic}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsPerfectFamily}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsPerfectWeddings}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsPerfectBanquets}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsPerfectCorporate}</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Space & Capacity */}
            <div className="flex flex-col pt-6 md:pt-0 md:pl-6 lg:pl-8 text-left">
              <span className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8c7853] mb-3 block border-b border-[#231912]/10 pb-1.5">
                {translations[locale].eventsSpaceTitle}
              </span>
              <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#231912]/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsSpaceInside}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsSpaceOutside}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#8c7853] mt-1 select-none">•</span>
                  <span>{translations[locale].eventsSpaceCapacity}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Elegant Windmill Section Divider */}
      <div className="flex items-center justify-center py-6 bg-[#f5ecd5] relative z-10 pointer-events-none select-none">
        <div className="w-16 h-[1px] bg-[#231912]/12" />
        <svg className="w-6 h-6 mx-4 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
          <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <div className="w-16 h-[1px] bg-[#231912]/12" />
      </div>

      {/* 4. INTERACTIVE MENU SECTION */}
      <section id="menu" className="py-12 lg:py-16 bg-[#f5ecd5] relative z-10">
        
        {/* Elegant Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 pt-8 pb-8 sm:pt-0 sm:pb-0 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-3 mb-8">
            <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
              {translations[locale].menuHeader}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
              {translations[locale].menuTitle}
            </h2>
            <div className="w-12 h-[1.5px] bg-[#8c7853]" />
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none -mx-8 px-8 sm:mx-0 sm:px-0 sm:flex-wrap items-center mb-8">
            {(["cold_starters", "hot_starters", "salads", "meats", "sauces_sides", "fish_seafood", "paellas_risottos", "kids_menu", "desserts"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedAddOns([]);
                }}
                className={`flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-400 border ${
                  activeCategory === cat
                    ? "bg-[#231912] text-[#f5ecd5] border-[#231912]"
                    : "bg-transparent text-[#231912]/60 border-[#231912]/12 hover:border-[#231912]/30 hover:text-[#231912]"
                }`}
              >
                {translations[locale][`cat_${cat}`]}
              </button>
            ))}
          </div>

          {/* Menu Table List (No Photos, Dotted Leaders, Descriptions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {MENU_ITEMS.filter((item) => item.category === activeCategory).map((item) => (
              <div key={item.id} className="flex flex-col gap-1 py-1 group cursor-default transition-all duration-300">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="font-sans text-[13px] sm:text-sm font-bold text-[#231912]/85 tracking-wide group-hover:text-[#8c7853] transition-colors duration-300">
                    {getMenuItemName(item, locale)}
                  </span>
                  <span className="flex-grow border-b border-dotted border-[#231912]/12 mx-2 align-baseline relative top-[-3px] group-hover:border-[#8c7853]/25 transition-colors duration-300" />
                  <span className="font-serif text-[13px] sm:text-sm font-bold text-[#8c7853] whitespace-nowrap group-hover:text-[#231912] transition-colors duration-300">
                    {typeof item.price === "number" ? `${item.price.toFixed(2)} €` : (locale === "en" ? "Market Price" : locale === "es" ? "Según mercado" : locale === "ru" ? "Рыночная цена" : locale === "de" ? "Tagespreis" : locale === "fr" ? "Prix du marché" : "Prezzo di mercato")}
                  </span>
                </div>
                {getMenuItemDescription(item, locale) && (
                  <p className="font-sans text-xs sm:text-[13px] text-[#231912]/50 font-light leading-relaxed">
                    {getMenuItemDescription(item, locale)}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Allergens Warning Block */}
          <div className="mt-12 pt-6 border-t border-[#231912]/8 text-left">
            <p className="font-sans text-[11px] text-[#231912]/60 leading-relaxed uppercase tracking-wider font-semibold">
              {translations[locale].allergyNoticeTitle}
            </p>
            <p className="font-sans text-[10px] text-[#231912]/40 leading-relaxed mt-1">
              {translations[locale].allergyNoticeAllergens}
            </p>
          </div>

        </div>
      </section>

      {/* Elegant Windmill Section Divider */}
      <div className="flex items-center justify-center py-6 bg-[#f5ecd5] relative z-10 pointer-events-none select-none">
        <div className="w-16 h-[1px] bg-[#231912]/12" />
        <svg className="w-6 h-6 mx-4 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
          <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <div className="w-16 h-[1px] bg-[#231912]/12" />
      </div>

      {/* 5. DRINKS MENU SECTION */}
      <section id="bar" className="py-12 lg:py-16 bg-[#f5ecd5] relative z-10">
        
        {/* Elegant Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 pt-8 pb-8 sm:pt-0 sm:pb-0 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2 mb-6 text-left">
            <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
              {translations[locale].barHeader}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
              {translations[locale].barTitle}
            </h2>
            <div className="w-12 h-[1.5px] bg-[#8c7853]" />
          </div>

          {/* Drinks Category Tabs */}
          <div className="flex justify-start gap-2 pb-2 overflow-x-auto scrollbar-none -mx-8 px-8 sm:mx-0 sm:px-0 mb-6">
            {(["classics", "aperitifs_digestifs", "non_alcoholic"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDrinkTab(tab)}
                className={`flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wide transition-all duration-400 border ${
                  activeDrinkTab === tab
                    ? "bg-[#231912] text-[#f5ecd5] border-[#231912]"
                    : "bg-transparent text-[#231912]/60 border-[#231912]/12 hover:border-[#231912]/30 hover:text-[#231912]"
                }`}
              >
                {translations[locale][`drink_tab_${tab}`]}
              </button>
            ))}
          </div>

          {/* Dotted leaders table-style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {DRINKS_MENU.filter(cat => getDrinkTab(cat.categoryEn) === activeDrinkTab).map((cat, catIdx) => (
              <div key={cat.categoryEn} className="flex flex-col group/cat animate-fade-in">
                <h3 className="font-serif italic text-base sm:text-lg text-[#231912] border-b border-[#231912]/10 pb-1.5 mb-3 tracking-wide uppercase">
                  {getDrinkCategoryName(cat.categoryEn, locale)}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col gap-0.5 group/item cursor-default transition-all duration-300">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="font-sans text-[13px] sm:text-sm font-medium text-[#231912]/85 tracking-wide group-hover/item:text-[#8c7853] transition-colors duration-300">
                          {getDrinkItemName(item, locale)}
                        </span>
                        <span className="flex-grow border-b border-dotted border-[#231912]/12 mx-2 align-baseline relative top-[-3px] group-hover/item:border-[#8c7853]/25 transition-colors duration-300" />
                        {item.volume && (
                          <span className="font-sans text-[10px] text-[#231912]/40 mr-2 whitespace-nowrap group-hover/item:text-[#231912]/60 transition-colors duration-300">
                            {item.volume}
                          </span>
                        )}
                        <span className="font-serif text-[13px] sm:text-sm font-bold text-[#8c7853] whitespace-nowrap group-hover/item:text-[#231912] transition-colors duration-300">
                          {item.price}
                        </span>
                      </div>
                      {getDrinkItemDescription(item, locale) && (
                        <p className="font-sans text-xs text-[#231912]/50 font-light leading-relaxed">
                          {getDrinkItemDescription(item, locale)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Elegant Windmill Section Divider */}
      <div className="flex items-center justify-center py-6 bg-[#f5ecd5] relative z-10 pointer-events-none select-none">
        <div className="w-16 h-[1px] bg-[#231912]/12" />
        <svg className="w-6 h-6 mx-4 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
          <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <div className="w-16 h-[1px] bg-[#231912]/12" />
      </div>

      {/* 5.5 GALLERY SECTION */}
      <section id="gallery" className="py-12 lg:py-16 bg-[#f5ecd5] relative z-10">
        
        {/* Elegant Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 pt-8 pb-8 sm:pt-0 sm:pb-0 relative z-10">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-8 text-left">
            <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
              {translations[locale].galleryHeader}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
              {translations[locale].galleryTitle}
            </h2>
            <p className="font-sans text-[10px] sm:text-[11px] text-[#8c7853] font-bold tracking-widest uppercase mt-0.5">
              {translations[locale].gallerySubtitle}
            </p>
            <div className="w-12 h-[1.5px] bg-[#8c7853] mt-2" />
          </div>

          {/* Grid Layout (Collage Style, Asymmetric and Clean) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`group relative overflow-hidden rounded-2xl border border-[#231912]/10 bg-[#231912]/5 cursor-pointer ${item.span} ${item.aspect} transition-all duration-500 hover:shadow-xl hover:border-[#8c7853]/45 hover:-translate-y-1`}
              >
                {/* Media Element */}
                {item.type === "video" ? (
                  <div className="relative w-full h-full">
                    <video
                      src={item.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Muted indicator or play overlay */}
                    <div className="absolute bottom-3 right-3 bg-[#231912]/70 text-[#f5ecd5] p-1.5 rounded-full backdrop-blur-sm z-10 pointer-events-none border border-white/10">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt="El Molino Blanco Venue Gallery Item"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                
                {/* Hover overlay with gold frame border inside */}
                <div className="absolute inset-0 bg-[#1e1611]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="absolute inset-3 border border-[#d4b986]/30 rounded-xl pointer-events-none scale-95 group-hover:scale-100 transition-transform duration-500" />
                  <div className="bg-[#f5ecd5]/90 text-[#231912] px-4 py-2 rounded-full shadow-lg text-[9px] font-bold tracking-widest uppercase border border-[#8c7853]/20 scale-90 group-hover:scale-100 transition-all duration-500">
                    {locale === "en" ? "View Details" : locale === "es" ? "Ver Detalles" : locale === "ru" ? "Подробнее" : locale === "de" ? "Details ansehen" : locale === "fr" ? "Voir les Détails" : "Visualizza"}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Elegant Windmill Section Divider */}
      <div className="flex items-center justify-center py-6 bg-[#f5ecd5] relative z-10 pointer-events-none select-none">
        <div className="w-16 h-[1px] bg-[#231912]/12" />
        <svg className="w-6 h-6 mx-4 text-[#8c7853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2v20M2 12h20" strokeWidth="0.5" strokeDasharray="1 1" />
          <path d="M12 12l-5-5m5 5l5-5m-5 5l-5 5m5-5l5 5" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <div className="w-16 h-[1px] bg-[#231912]/12" />
      </div>

      {/* 6. ATMOSPHERE & LOCATIONS */}
      <section id="contacts" className="py-12 lg:py-16 bg-[#f5ecd5] relative z-10">
        
        {/* Elegant Corner Ornaments & Border Frame */}
        <div className="absolute inset-4 sm:inset-6 pointer-events-none z-0 border border-[#231912]/10 rounded-2xl sm:rounded-3xl">
          <svg className="absolute top-2.5 left-2.5 w-6 h-6 sm:top-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute top-2.5 right-2.5 w-6 h-6 sm:top-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 left-2.5 w-6 h-6 sm:bottom-3 sm:left-3 sm:w-8 sm:h-8 text-[#8c7853]/60 -rotate-90" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-2.5 right-2.5 w-6 h-6 sm:bottom-3 sm:right-3 sm:w-8 sm:h-8 text-[#8c7853]/60 rotate-180" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M0 40V0H40" />
            <path d="M6 40V6H40" strokeDasharray="2 2" strokeWidth="0.8" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-8 sm:px-12 pt-8 pb-8 sm:pt-0 sm:pb-0 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col gap-2 mb-8 text-left">
            <span className="font-sans text-[11px] font-bold tracking-[0.14em] text-[#231912]/45 uppercase">
              {translations[locale].helloHeader}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231912] tracking-tight leading-[1.1] uppercase">
              {translations[locale].helloTitle}
            </h2>
            <div className="w-12 h-[1.5px] bg-[#8c7853]" />
          </div>

          {/* Side-by-Side Adaptive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-stretch">
            {/* Contacts Info Card (left on desktop, full-width on mobile) */}
            <div className="md:col-span-2 flex flex-col justify-between gap-6 border border-[#231912]/10 rounded-3xl p-5 sm:p-6 md:p-8 bg-[#231912]/[0.02]">
              {/* Address */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8c7853]">{translations[locale].addressTitle}</span>
                <a 
                  href="https://maps.app.goo.gl/22P5bSoH9xeFEYN56?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans text-sm sm:text-base text-[#231912]/85 leading-relaxed hover:text-[#8c7853] transition-colors"
                >
                  Av. Austria, 5, 38660 Costa Adeje<br />{"Santa Cruz de Tenerife, " + (locale === "en" ? "Spain" : locale === "es" ? "España" : locale === "ru" ? "Испания" : locale === "de" ? "Spanien" : locale === "fr" ? "Espagne" : "Spagna")}
                </a>
              </div>

              {/* Hours */}
              <div className="flex flex-col gap-1 text-left">
                <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8c7853]">{translations[locale].hoursTitle}</span>
                <p className="font-sans text-sm sm:text-base text-[#231912]/85 leading-relaxed">
                  {translations[locale].hoursDesc}
                </p>
                <span className="font-sans text-[10px] text-[#231912]/40 font-medium">{translations[locale].hoursKitchenNote}</span>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-[#8c7853] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c7853] animate-pulse" />
                  {translations[locale].helloLiveMusicBadge}
                </div>
              </div>

              {/* Phone & Booking */}
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8c7853]">{translations[locale].phoneTitle}</span>
                  <p className="font-sans text-sm sm:text-base text-[#231912]/85 mt-0.5">
                    <a href="tel:+34620770072" className="hover:text-[#8c7853] transition-all duration-300">+34 620 770 072</a>
                  </p>
                </div>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#231912] text-[#f5ecd5] font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-[#8c7853] transition-all duration-300 self-start"
                >
                  {translations[locale].bookYourSeat}
                </a>
              </div>
            </div>

            {/* Google Map Panel (right on desktop, full-width on mobile) */}
            <div className="md:col-span-3 relative h-[260px] sm:h-[320px] md:h-auto min-h-[260px] rounded-3xl overflow-hidden border border-[#231912]/10 group animate-fade-in">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.2515655913244!2d-16.7291153!3d28.0778684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a975ecaa496e7%3A0xaaeaf88b0766c71f!2sEl%20Molino%20Blanco!5e0!3m2!1sru!2s!4v1780164446039!5m2!1sru!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale contrast-110 sepia-[15%] opacity-85 transition-all duration-700 group-hover:sepia-0 group-hover:grayscale-0 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. AESTHETIC FOOTER */}
      <footer className="bg-[#231912] text-[#f5ecd5]/60 py-6 border-t border-[#f5ecd5]/10 relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Side: Logo & Socials on one line */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a href="#" className="flex items-center group">
              <img
                src="/logo-white.png?v=3"
                alt="El Molino Blanco Logo"
                className="w-auto h-8 object-contain"
              />
            </a>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
              <a 
                href="https://www.instagram.com/elmolinoblanco?igsh=MTVtcnJxdXppOGt6Nw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#f5ecd5]/50 hover:text-white transition-colors"
              >
                {translations[locale].navInstagram}
              </a>
              <span className="text-[#f5ecd5]/10 font-light">·</span>
              <a 
                href="mailto:info@restaurantemolinoblanco.com" 
                className="text-[#f5ecd5]/50 hover:text-white transition-colors"
              >
                {translations[locale].navEmail}
              </a>
            </div>
          </div>

          {/* Right Side: Copyright & Location on one line */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans text-center">
            <span className="text-[#f5ecd5]/50">
              {translations[locale].footerCopyright}
            </span>
            <span className="text-[#f5ecd5]/20 font-light">·</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#d4b986]">
              {translations[locale].footerLocation}
            </span>
          </div>

        </div>
      </footer>

      {/* 7. CUSTOM CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#1e1611]/70 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-md bg-[#f5ecd5] h-full flex flex-col justify-between p-8 border-l border-[#231912]/15 animate-fade-in-up">
            
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold uppercase tracking-wider text-[#231912]">{translations[locale].cartTitle}</span>
                  <span className="text-[10px] font-sans text-[#231912]/60 uppercase tracking-widest mt-1">{translations[locale].cartSubTitle}</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full border border-[#231912]/10 hover:bg-[#231912]/5"
                >
                  <svg className="w-5 h-5 text-[#231912]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center gap-4">
                  <svg className="w-12 h-12 text-[#231912]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="font-serif text-[#231912]/70 italic">{translations[locale].cartEmpty}</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const target = document.getElementById("menu");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-2 text-xs font-serif font-bold uppercase tracking-widest text-[#231912] underline"
                  >
                    {translations[locale].cartViewMenu}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 overflow-y-auto max-h-[55vh] pr-2">
                  {cart.map((item, index) => {
                    const addOnsPrice = item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
                    const basePrice = typeof item.menuItem.price === "number" ? item.menuItem.price : 0;
                    const itemTotal = (basePrice + addOnsPrice) * item.quantity;
                    
                    return (
                      <div key={index} className="flex flex-col border-b border-[#231912]/10 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif text-base font-semibold text-[#231912]">
                              {getMenuItemName(item.menuItem, locale)}
                            </h4>
                            
                            {item.selectedAddOns.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {item.selectedAddOns.map((a) => (
                                  <span key={a.id} className="text-[9px] bg-[#231912]/5 px-2 py-0.5 rounded font-sans text-[#231912]/70">
                                    +{a.name} ({a.price.toFixed(2)} €)
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="font-serif font-bold text-[#231912]">
                            {typeof item.menuItem.price === "number" 
                              ? `${itemTotal.toFixed(2)} €` 
                              : (locale === "en" ? "Market Price" : locale === "es" ? "Según mercado" : locale === "ru" ? "Рыночная цена" : locale === "de" ? "Tagespreis" : locale === "fr" ? "Prix du marché" : "Prezzo di mercato")}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-[#231912]/15 bg-white rounded-full p-0.5">
                            <button
                              onClick={() => handleUpdateQuantity(index, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-900/5 text-[#231912]"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-bold font-sans text-[#231912]">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(index, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-900/5 text-[#231912]"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(index)}
                            className="text-[10px] font-serif font-bold text-[#231912]/40 hover:text-[#231912] uppercase tracking-widest"
                          >
                            {translations[locale].cartRemove}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#231912]/15 pt-6">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-serif text-sm font-bold uppercase tracking-wider text-[#231912]/75">{translations[locale].cartSubtotal}</span>
                  <span className="font-serif text-2xl font-bold text-[#231912]">{calculateCartTotal().toFixed(2)} €</span>
                </div>
                <p className="text-[10px] text-[#231912]/40 font-sans mb-4 leading-relaxed">
                  {translations[locale].cartNotice}
                </p>
                <button
                  onClick={() => {
                    const total = calculateCartTotal().toFixed(2);
                    const alertMsg = locale === "en" 
                      ? `Order Registered! Total: €${total}. We await your arrival!`
                      : locale === "es"
                      ? `¡Pedido registrado! Total: €${total}. ¡Le esperamos!`
                      : locale === "ru"
                      ? `Заказ зарегистрирован! Итого: €${total}. Мы ждем вашего прихода!`
                      : locale === "de"
                      ? `Bestellung registriert! Gesamt: €${total}. Wir erwarten Sie!`
                      : locale === "fr"
                      ? `Commande enregistrée ! Total : €${total}. Nous attendons votre arrivée !`
                      : `Ordine registrato! Totale: €${total}. Vi aspettiamo!`;
                    alert(alertMsg);
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-4 rounded-full bg-[#231912] text-[#f5ecd5] font-sans text-xs font-semibold tracking-widest uppercase hover:bg-[#231912]/90 hover:scale-102 transition-all"
                >
                  {translations[locale].cartSendOrder}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 8. RESERVATION BOOKING MODAL */}
      {isReserveOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            onClick={() => !reservationSuccess && resetReservation()}
            className="absolute inset-0 bg-[#1e1611]/70 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-lg bg-[#f5ecd5] rounded-3xl p-8 md:p-10 border border-[#231912]/15 z-10 animate-fade-in-up">
            
            <button
              onClick={resetReservation}
              className="absolute top-6 right-6 p-1 rounded-full border border-[#231912]/10 hover:bg-[#231912]/5 z-20"
            >
              <svg className="w-5 h-5 text-[#231912]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {reservationSuccess ? (
              <div className="text-center py-6 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#231912] text-[#f5ecd5] flex items-center justify-center animate-bounce">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#231912]">{translations[locale].reserveSuccessSecured}</h3>
                  <p className="font-script text-xl text-[#231912]/80">{translations[locale].reserveSuccessExpecting}{reservationName}</p>
                </div>

                <div className="bg-white/50 border border-[#231912]/10 rounded-2xl p-6 w-full space-y-3 text-sm text-[#231912] font-sans">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#231912]/50">{translations[locale].reserveSuccessDate}</span>
                    <span className="font-bold text-[#231912]">{reservationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#231912]/50">{translations[locale].reserveSuccessTime}</span>
                    <span className="font-bold text-[#231912]">{reservationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#231912]/50">{translations[locale].reserveSuccessGuests}</span>
                    <span className="font-bold text-[#231912]">{reservationGuests} {translations[locale].reserveSuccessGuestsUnit}</span>
                  </div>
                  <div className="pt-3 border-t border-[#231912]/5 flex justify-between items-center">
                    <span className="font-bold text-xs uppercase tracking-wider text-[#231912]/50">{translations[locale].reserveSuccessCode}</span>
                    <span className="font-serif font-black text-base text-[#231912] bg-white px-3 py-1 rounded border border-[#231912]/15">{resCode}</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#231912]/50 font-sans leading-relaxed max-w-sm">
                  {translations[locale].reserveSuccessSmsNotice}
                </p>

                <button
                  onClick={resetReservation}
                  className="px-8 py-3 rounded-full bg-[#231912] text-[#f5ecd5] font-sans text-xs font-bold tracking-widest uppercase hover:bg-[#231912]/90 transition-all"
                >
                  {translations[locale].reserveSuccessReturn}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-col space-y-1 mb-8">
                  <span className="font-serif text-2xl font-bold uppercase tracking-wider text-[#231912]">{translations[locale].reserveLockTitle}</span>
                  <span className="text-[10px] font-sans text-[#231912]/60 uppercase tracking-widest">{translations[locale].reserveLockSubTitle}</span>
                </div>

                <form onSubmit={handleReserveSubmit} className="space-y-5 font-sans">
                  
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#231912]/50">{translations[locale].reserveFullName}</label>
                    <input
                      type="text"
                      required
                      placeholder={locale === "en" ? "e.g. Elizabeth Bennett" : locale === "es" ? "ej. Elizabeth Bennett" : locale === "ru" ? "например, Елизавета Беннет" : locale === "de" ? "z. B. Elizabeth Bennett" : locale === "fr" ? "par exemple, Elizabeth Bennett" : "es. Elizabeth Bennett"}
                      value={reservationName}
                      onChange={(e) => setReservationName(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-[#231912]/10 bg-white text-[#231912] focus:outline-none focus:border-[#231912]/40 text-base font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#231912]/50">{translations[locale].reserveDate}</label>
                      <input
                        type="date"
                        required
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-[#231912]/10 bg-white text-[#231912] focus:outline-none focus:border-[#231912]/40 text-base font-medium"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#231912]/50">{translations[locale].reserveTime}</label>
                      <input
                        type="time"
                        required
                        value={reservationTime}
                        onChange={(e) => setReservationTime(e.target.value)}
                        className="w-full px-5 py-3 rounded-xl border border-[#231912]/10 bg-white text-[#231912] focus:outline-none focus:border-[#231912]/40 text-base font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#231912]/50">{translations[locale].reserveGuests}</label>
                    <select
                      value={reservationGuests}
                      onChange={(e) => setReservationGuests(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border border-[#231912]/10 bg-white text-[#231912] focus:outline-none focus:border-[#231912]/40 text-base font-medium appearance-none"
                    >
                      <option value="1">{translations[locale].reserveGuestsSingle}</option>
                      <option value="2">2 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="3">3 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="4">4 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="5">5 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="6">6 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="7">7 {translations[locale].reserveGuestsMultiple}</option>
                      <option value="8">8 {translations[locale].reserveGuestsMultiple}</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-[#231912]/50 font-sans leading-relaxed pt-2">
                    {translations[locale].reserveNote}
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#231912] text-[#f5ecd5] font-sans text-xs font-semibold tracking-widest uppercase hover:bg-[#231912]/90 hover:scale-102 transition-all mt-4"
                  >
                    {translations[locale].reserveConfirmButton}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 9. LIGHTBOX MODAL */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-[#16100c]/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={() => setActiveGalleryIndex(null)} />
          
          {/* Close button */}
          <button 
            onClick={() => setActiveGalleryIndex(null)}
            className="absolute top-6 right-6 z-20 p-2.5 rounded-full border border-[#f5ecd5]/20 text-[#f5ecd5] hover:bg-[#f5ecd5]/10 hover:border-[#f5ecd5]/40 transition-all duration-300"
            aria-label="Close Lightbox"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Prev button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveGalleryIndex(prev => prev !== null ? (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1) : null);
            }}
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full border border-[#f5ecd5]/15 text-[#f5ecd5] hover:bg-[#f5ecd5]/10 hover:border-[#f5ecd5]/30 transition-all duration-300"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Next button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveGalleryIndex(prev => prev !== null ? (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1) : null);
            }}
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full border border-[#f5ecd5]/15 text-[#f5ecd5] hover:bg-[#f5ecd5]/10 hover:border-[#f5ecd5]/30 transition-all duration-300"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Content Area */}
          <div className="relative z-10 max-w-5xl max-h-[80vh] px-4 flex flex-col items-center justify-center">
            {GALLERY_ITEMS[activeGalleryIndex].type === "video" ? (
              <video 
                src={GALLERY_ITEMS[activeGalleryIndex].src} 
                controls 
                autoPlay 
                playsInline
                className="max-w-full max-h-[72vh] rounded-2xl shadow-2xl object-contain border border-[#f5ecd5]/10"
              />
            ) : (
              <img 
                src={GALLERY_ITEMS[activeGalleryIndex].src} 
                alt="El Molino Blanco Venue Gallery Details" 
                className="max-w-full max-h-[72vh] rounded-2xl shadow-2xl object-contain border border-[#f5ecd5]/10 animate-fade-in"
              />
            )}
            
            {/* Slide counter */}
            <span className="font-serif text-[11px] uppercase tracking-[0.2em] text-[#d4b986] mt-5">
              {activeGalleryIndex + 1} / {GALLERY_ITEMS.length}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
