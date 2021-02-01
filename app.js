const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productsRoutes = require('./routers/products');
const categoryRoutes = require('./routers/categories');
const userRoutes = require('./routers/users');
const cors = require('cors');

require('dotenv/config');

const api = process.env.API_URL;

//cors
app.use(cors());
app.options('*',cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routes
app.use(`${api}/products`,productsRoutes);
app.use(`${api}/categories`,categoryRoutes);
app.use(`${api}/users/`,userRoutes);

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Database connection established');
}).catch((err)=>{console.log(err);})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('Server is running on port '+process.env.PORT);
});

