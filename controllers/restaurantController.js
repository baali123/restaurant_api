const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const { page = 1, perPage = 10, borough } = req.query;
  const filter = borough ? { borough } : {};
  const skip = (page - 1) * perPage;

  try {
    const restaurants = await Restaurant.find(filter)
      .sort({ restaurant_id: 1 })
      .skip(skip)
      .limit(parseInt(perPage));
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const result = await Restaurant.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
