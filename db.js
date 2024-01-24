const mongoose = require('mongoose')
const mongoDbUri = 'mongodb://localhost:27017/goFiestMern';

const mongoDB = async () => {
    const mongooseConn = await mongoose.connect(mongoDbUri);
    //const fetched_data = await mongoose.connection.db.collection('food-items');
    //console.log(await fetched_data.find().toArray())
    // await fetched_data.find().toArray()
    try {
        // fetching food-items data from db
        const fooditems_data = await mongoose.connection.db.collection('food-items');
        //await fooditems_data.find().toArray()
        //console.log(await fooditems_data.find().toArray())
        global.food_items = await fooditems_data.find().toArray()
        //console.log("food_items global:",global.food_items)

        // fetching food-category data from db
        const foodCategory_data = await mongoose.connection.db.collection('food-category');
        global.food_category = await foodCategory_data.find().toArray()
        //console.log("food_category global:",global.food_category)
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = mongoDB;