const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    //If there are errors return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
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
                "error": "User eamil already exits"
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
        const jwtData = jwt.sign(data, JWT_SECRET);
        console.log(jwtData);

        res.json({
            "Sucess": true,
            "data": user
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Something went wromg")
    }



})

module.exports = router;