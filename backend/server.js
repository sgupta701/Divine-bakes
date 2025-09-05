const express = require('express');
const mongoose = require('mongoose');
const Cake = require('./models/cake');  // Import the Cake model
const cakesRouter = require('./routes/cakes'); // Import the cakes routes
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB Atlas connection string
const dbURI = "mongodb+srv://saumya78198:L2RmiwDYSX0VYp7q@db-cluster.r30fo.mongodb.net/?retryWrites=true&w=majority&appName=db-cluster";

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Seed the database with some initial cake data
    seedDatabase();
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Atlas:", err);
  });

// Use the cakes router for routes starting with '/cakes'
app.use('/cakes', cakesRouter);

// Seed the database with some cakes if it's empty
const seedDatabase = async () => {
  try {
    const cakeCount = await Cake.countDocuments();
    if (cakeCount === 0) {
      await insertCakes(); // Only insert cakes if none exist
    } else {+
      console.log("Cakes already exist in the database.");
    }
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
};

// Sample cake data
const cakesData = [
  { name: "Blueberry Cake", price: 399, description: "Delicious and fresh blueberry-flavored cake", image: "blueberrycake.jpg", category: "Special Flavour", flavour: "Blueberry" },
  { name: "Rasmalai Cake", price: 449, description: "A fusion of rasmalai with a soft and spongy cake", image: "rasmalaicake.jpg", category: "Special Flavour", flavour: "Rasmalai" },
  { name: "Strawberry Cake", price: 349, description: "A fresh and fruity strawberry cake", image: "strawberrycake.jpg", category: "Special Flavour", flavour: "Strawberry" },
  { name: "Pineapple Cake", price: 399, description: "Tangy and sweet pineapple-flavored cake", image: "pineapplecake.jpg", category: "Special Flavour", flavour: "Pineapple" },
  { name: "Chocolate Cake", price: 449, description: "Rich chocolate cake topped with chocolate ganache", image: "chocolatecake.jpg", category: "Special Flavour", flavour: "Chocolate" },
  { name: "Mirror Glaze Cake", price: 409, description: "A stunning cake with a glossy mirror glaze", image: "mirrorglazecake.jpg", category: "Special Flavour", flavour: "Chocolate" },
  { name: "Butterfly Cake", price: 399, description: "Beautiful butterfly-shaped cake for special occasions", image: "butterflycake.jpg", category: "Theme", flavour: "Vanilla" },
  { name: "Lightning McQueen Cake", price: 620, description: "Racecar-themed cake with a lightning design", image: "lightningmcqueen.jpg", category: "Character", flavour: "Chocolate" },
  { name: "Unicorn Cake", price: 499, description: "Magical unicorn-themed cake with a pastel rainbow design", image: "unicorncake.jpg", category: "Theme", flavour: "Vanilla" },
  { name: "Princess Cake", price: 459, description: "Elegant princess-themed cake with a fondant design", image: "princesscake.jpg", category: "Theme", flavour: "Strawberry" },
  { name: "Tiramisu Cake", price: 549, description: "Classic tiramisu cake with a rich coffee flavor", image: "tiramisucake.jpg", category: "International", flavour: "Coffee" },
  { name: "Red Velvet Cake", price: 499, description: "Rich and velvety red velvet cake with cream cheese frosting", image: "redvelvetcake.jpg", category: "Special Flavour", flavour: "Red Velvet" },
  { name: "Fruit Cake", price: 479, description: "A delicious combination of seasonal fruits and cake", image: "fruitcake.jpg", category: "Special Flavour", flavour: "Mixed Fruit" },
  { name: "Coffee Cake", price: 399, description: "A delightful cake flavored with coffee and topped with a crumbly topping", image: "coffeecake.jpg", category: "Special Flavour", flavour: "Coffee" },
  { name: "Mango Cake", price: 450, description: "A refreshing mango-flavored cake perfect for summer", image: "mangocake.jpg", category: "Special Flavour", flavour: "Mango" },
  { name: "Cheesecake", price: 599, description: "Classic cheesecake with a smooth and creamy texture", image: "cheesecake.jpg", category: "Special Flavour", flavour: "Cheese" }
];

// Insert cakes data into MongoDB
const insertCakes = async () => {
  try {
      await Cake.deleteMany({}); // Clear existing cakes
      await Cake.insertMany(cakesData); // Insert new cakes
      console.log("Cakes data inserted!");
  } catch (err) {
      console.error("Error inserting cakes data:", err);
  }
};

// Express routes
app.get('/', (req, res) => {
  res.send('Welcome to the Bakery!');
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
