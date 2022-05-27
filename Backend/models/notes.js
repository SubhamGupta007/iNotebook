import mongoose from "mongoose";

const NotesSchema = new Schemna ( {
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=NotesSchema