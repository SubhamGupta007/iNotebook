const express=require('express')
const router= express.Router();
const User=require('../models/user')
const bcrypt=require("bcryptjs")
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const JWT_SECRET = 'subhamisagoodb$boy'
router.post('/createuser',[
  // email must be an email
  body('email','enter a valid email').isEmail(),
  // password must be at least 5 chars long
  body('name','enter a valid name').isLength({ min: 3 }),
  body('password').isLength({ min: 5 }),
],async (req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    //check wheather user with this email address exists or not
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        // password hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secPass,
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        
        res.json({authtoken:authtoken})
    }catch(error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;