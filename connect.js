const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the application if the DB connection fails
    }
}

module.exports = {
    connectToMongoDB,
};
