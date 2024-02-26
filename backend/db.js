const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://balupatil4815:balu123@cluster0.u6dsgbv.mongodb.net/goFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB successfully");
    
    const fetchData = await mongoose.connection.db.collection("foods");
    const data = await fetchData.find({}).toArray();
    global.foods = data;
    // console.log(global.foods)
    try {
      const categoryData = await mongoose.connection.db.collection("categories");
    const catData = await categoryData.find({}).toArray();
    global.categories = catData;
    } catch (error) {
      console.error("Error in Category Data:", error);
    }
    
    // console.log(global.categories)
    
  } catch (err) {
    console.error("Error in Food Data:", err);
  }
};

module.exports = mongoDB;
