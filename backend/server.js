const express = require("express");
const app = express();

const mongoose = require("mongoose");

const morgan = require("morgan");

require("dotenv").config();

const bodyParser = require("body-parser");
var cors = require('cors');

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");



// import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// // // //database connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.vj0umcm.mongodb.net/jobportal");
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('database connected successsfuly');
})
connection.on('error', () => {
    console.log('database connection failed!');
})
// // // //MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());


// // //ROUTES MIDDLEWARE
// // // app.get('/', (req, res) => {
// // //     res.send("Hello from Node Js");
// // // })


// error middleware
app.use(errorHandler);

//port

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});