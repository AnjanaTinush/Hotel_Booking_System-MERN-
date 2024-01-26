const mongoose = require("mongoose");

const roomScheama=mongoose.Schema({

    name : {
        type : String,
        require : true
    },

    maxcount : {

        type : Number,
        require :true
    },
    phonenumber : {

        type : Number,
        require :true
    },

    rentperday : {
         
        type : Number,
        require :true
    },
    
    imageurl : [],
    currentbookings :[],
    

    type : {
        type : String,
        require : true
    },


    description : {

        type : String,
        require : true

    }


} , {
     timestamps :true,
})

const roomModel =mongoose.model('rooms',roomScheama)

module.exports=roomModel  
