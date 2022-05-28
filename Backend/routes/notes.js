const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router= express.Router();
const Notes = require("../models/notes")
const { body, validationResult } = require('express-validator');


//req all notes 
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes = await Notes.find({user:req.user.id})
    
    res.json(notes)
})


//add notes using post operation
router.post("/addnotes",fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
   
    body('description','enter a valid description').isLength({ min: 3 }),
   
    body('tag','enter a valid tag').isLength({ min: 3 }),
   
],async(req,res)=>{
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note =new Notes({
        user:req.user.id,title,description,tag
    })

    try {
        const savenote = await note.save();
        res.json(note);        
    } catch (error) {
         console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//update an existing node 
router.put("/updatenote/:id",fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
   
    body('description','enter a valid description').isLength({ min: 3 }),
   
    body('tag','enter a valid tag').isLength({ min: 3 }),
   
],async(req,res)=>{


    const {title,description,tag}=req.body
    //create new note 
     const newNote ={
     }
     if(title){newNote.title=title};
     if(description){newNote.description=description};
     if(tag){newNote.tag=tag};

     //find the note to be updated 
     let note =await Notes.findById(req.params.id)
     if(!note)return res.status(400).send("note not found");

     if(note.user.toString()!=req.user.id)
     {
         return res.status(401).send("not allowed")
     }

     
    try {
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:"true"})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//delete an existing node 
router.delete("/deletenote/:id",fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
   
    body('description','enter a valid description').isLength({ min: 3 }),
   
    body('tag','enter a valid tag').isLength({ min: 3 }),
   
],async(req,res)=>{


    const {title,description,tag}=req.body
     //find the note to be updated 
     let note =await Notes.findById(req.params.id)
     if(!note)return res.status(400).send("note not found");

     if(note.user.toString()!=req.user.id)
     {
         return res.status(401).send("not allowed")
     }

     
    try {
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"deleted":"deleted successfully"})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;