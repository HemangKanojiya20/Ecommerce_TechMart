const express = require('express')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors');
const productRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');
const cartRoute = require('./routes/cart');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        console.log("Database is connected")
    } catch (error) {
        console.log("Database connection failure")
    }
}

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/auth', authRoute)
app.use("/products", productRoute)
app.use("/review", reviewRoute)
app.use("/cart", cartRoute)


app.listen(port , () => {
    connect();
    console.log(`The server is listening on port ${port}`)
})