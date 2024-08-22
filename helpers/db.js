const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("");
        console.log(`MongoDB connected`);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;