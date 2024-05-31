const mongoose = require('mongoose')

URI = "mongodb+srv://vishwajeetroundhal0:l9PFDWtWSHuFkM94@food-delivery-cluster.jdooih8.mongodb.net/?retryWrites=true&w=majority&appName=food-delivery-cluster"


const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connected to database");
    } catch (error) {
        console.error(error,"error getting data")
    }
}

module.exports = connectDB
