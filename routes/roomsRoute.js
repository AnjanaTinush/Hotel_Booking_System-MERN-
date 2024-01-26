const express = require("express");
const router = express.Router();

const Room = require('../models/room');

router.get("/getallrooms",async(req,res) =>{

    try {
      const rooms = await Room.find()
      return res.json(rooms);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});

router.post("/getroombyid",async(req,res) =>{

  const roomid=req.body.roomid

  try {
    const room = await Room.findOne({_id : roomid})
     res.send(room);
  } catch (error) {
      return res.status(400).json({massage : error})
  }
});


router.post('/addroom',async(req,res)=>{
  try {
    const newroom = new Room(req.body)
    await newroom.save()
     
    res.send("New Room Added Successfully")

  } catch (error) {
    return res.status(400).json({error})
  }
})

/*router.route("/getallrooms").get((req,res) => {

  Room.find().then((rooms) => {
    res.json(rooms);
  }).catch((err) => {
    console.log(err);
  })
})*/

module.exports=router;

