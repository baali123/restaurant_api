/*********************************************************************************
* ITE5315 – Project
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* Name: HRISHIKESH MORE  Student ID: N01718922   Date: 2025-04-11
**********************************************************************************/

const express = require("express");
const exphbs = require("express-handlebars");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurantRoutes");
const Restaurant = require("./models/Restaurant");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/api/restaurants", restaurantRoutes);

// UI Routes
app.get("/", async (req, res) => {
  const restaurants = await Restaurant.find().limit(10).lean();
  res.render("home", { restaurants });
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).lean();
    res.render("detail", restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load restaurant details.");
  }
});


// Start Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

