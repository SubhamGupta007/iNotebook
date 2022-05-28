const express=require('express')
const router= express.Router();
const User=require('../models/user')
const bcrypt=require("bcryptjs")
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
var fetchuser=require("../middleware/fetchuser");


const JWT_SECRET = 'subhamisagoodb$boy'

// create a user no login required
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

//login a user
router.post('/login',[
    // email must be an email
    body('email','enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password','password cannot be blank').isLength({ min: 5 }),
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try {
        let user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error:'sorry user does not exists'})
        }
        const passwordcompare =await  bcrypt.compare(password,user.password)
        console.log(passwordcompare);
        if(!passwordcompare)
        {
            return res.status(400).json({error:'password did not match'})
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        
        res.json({authtoken:authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  })

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;