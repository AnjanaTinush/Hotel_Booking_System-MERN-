const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    room :{
        type:String,
        require : true
    },
    roomid :{
        type:String,
        require : true
    },
    userid :{
        type :String,
        require :true
    },
    fromdate :{
        type :String,
        require :true
    },
    todate :{
        type :String,
        require :true
    },
    totalamount :{
        type :String,
        require :true
    },
    totaldays :{
        type :String,
        require :true
    },
    transactionId :{
        type :String,
        require :true
    },
    status :{
        type :String,
        require :true,
        default :'booked'
    }
},{
    timestamps :true
})

const bookingmodel = mongoose.model('bookings',bookingSchema)

module.exports=bookingmodel