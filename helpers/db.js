const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://msty:1910musty@cluster0.60j8ntu.mongodb.net/Musty");
        console.log(`MongoDB connected`);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;