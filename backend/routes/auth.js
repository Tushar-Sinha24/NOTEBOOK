const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Hellomonkeys'
  
// Post Creating a user
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid Name').isLength({
        min: 3
    }),
    body('password', "Password must be atleast 5 charchter long").isLength({
        min: 5
    }),
], async (req, res) => {
    let success=false;
    //If there are errors return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success,
            errors: errors.array()
        });
    }
    //check weather the user with the same email exist
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        console.log(user)
        if (user) {
            return res.status(400).json({
               success, "error": "User eamil already exits"
            })
        }
        //securing the password
        const salt =await bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hashSync(req.body.password, salt);
    

        //create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })

        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        res.json({success:true,authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})


//ROUTE 2 : Authenticate a USer using:POST "/api/auth/login" no Login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success=false;
//If there are errors return bad request 
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
}

const{email,password}=req.body;

try {
    let user = await User.findOne({email})
    console.log(user)
    if (!user) {
        success=false
        return res.status(400).json({success,"error": "Please try to login with correct crdential"})
        
    }

    const passwordComapare=await bcrypt.compare(password,user.password);
    if (!passwordComapare) {
        success=false;
        return res.status(400).json({success,"error": "Please try to login with correct crdential"})
        
    }

    const data={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,authToken})
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
}

})


//ROUTE 3: Get logged in user detail using POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {

try {

    let userId=req.user.id;
    const user= await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error");
}

})


module.exports = router;