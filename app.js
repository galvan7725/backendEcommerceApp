const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

app.listen(process.env.PORT || 3000 ,()=>{
    console.log('Server is running on port '+process.env.PORT);
});

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('Database connection established');
}).catch((err)=>{console.log(err);})

app.get(`${api}/home`,(req, res)=>{
    const response = {
        id: 1,
        name : 'Luis'
    }
    res.send(response);
})

