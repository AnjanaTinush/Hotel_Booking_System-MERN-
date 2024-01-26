const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app =express(); 

const dbconfig = require('./db'); 
const roomsRoute = require('./routes/roomsRoute')
const usersRoute =require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')

app.use(express.json())

app.use('/api/rooms' , roomsRoute)
app.use('/api/users', usersRoute) 
app.use('/api/bookings',bookingsRoute)

const port =process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port,()=>console.log(`Node server started using nodemon`));

