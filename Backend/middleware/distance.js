const Restaurant = require('../models/Restaurant')

//this is haversine formula
const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const attachDistance = (userCoords) => async (req, res, next) => {
    try {
      const restaurants = await Restaurant.find();
      const restaurantsWithDistance = restaurants.map((restaurant) => {
        const distance = haversineDistance(
          { lat: userCoords.lat, lon: userCoords.lon },
          { lat: restaurant.latitude, lon: restaurant.longitude }
        );
        return { ...restaurant._doc, distance };
      });
      req.restaurantsWithDistance = restaurantsWithDistance;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { attachDistance }
  