const config = require('../config/config.js');
const mongoose = require('mongoose');

// Server database se kase connect hoga, ye hum db.js file mein likhenge

async function connectToDB() {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to Database successfully✅');
        });

        mongoose.connection.on('error', (err) => {
            console.log("Error connecting to Database❌", err);
        });

        await mongoose.connect(config?.mongoDBUri);
        
    } catch (error) {
        console.error("Failed to connect to Database❌", error);
        process.exit(1);
    }
}

module.exports = connectToDB;