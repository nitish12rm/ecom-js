//Create instance
const express = require('express');
//Parses incoming request bodies in a middleware before your handlers, and makes the parsed data available under req.body.
const bodyParser = require('body-parser');
//Helps secure Express/Node.js applications by setting various HTTP headers.
const helmet = require('helmet');
//Generates logs of incoming requests, providing information such as request method, status code, response time, and more. Useful for debugging and monitoring.
const morgan = require('morgan');
//Allows or restricts cross-origin HTTP requests (requests from one domain to another) based on the server's configuration. Essential for security when dealing with client-side web applications.
// Middleware to enable Cross-Origin Resource Sharing in Express.js.
const cors = require('cors');
//An ODM (Object Data Modeling) library for MongoDB and Node.js.
//Simplifies interactions with MongoDB databases by providing a schema-based solution to model application data. It also includes features like validation, middleware, and query building.
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect('mongodb+srv://nitish12rm:yoyonkg@cluster0.jvos2sz.mongodb.net/ecommerce?retryWrites=true&w=majority');
const PORT = 3000;

app.listen(PORT,()=>console.log('Sever started at port: '+ PORT));
//user routes
const UserRoutes = require('./routes/user_routes');
// "/api/user" path pe UserRoute available kar rahe
app.use("/api/user", UserRoutes);
//category routes
const CategoryRoutes = require('./routes/category_routes');
app.use("/api/category", CategoryRoutes);
//product routes
const productRoute = require('./routes/product_routes');
app.use("/api/product",productRoute);
//cart route
const cartRoute = require('./routes/cart_routes');
app.use('/api/cart',cartRoute);
//order route
const orderRoute = require('./routes/order_routes');
app.use('/api/order',orderRoute);