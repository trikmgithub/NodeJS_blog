const mongoose = require('mongoose');
const myDbAddress = 'mongodb://localhost:27017/f8_education_dev';
async function connect() {
    try {
        await mongoose.connect(myDbAddress);
        console.log('------Connected to Mongo successfully------');
    } catch (error) {
        console.log(`------Connected to Mongo failed------\n${error.message}`);
    }
}

module.exports = { connect };
