const express = require('express');
const router=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body,validationResult} = require('express-validator');

//ROUTE 1: Get all notes using GET  "/api/notes/fetchallnotes"  
router.get('/fetchallnotes', fetchuser , async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.user.id})
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
    
})

//ROUTE 2: Add a notes using POST  "/api/notes/addnotes" . Login reuired
router.post('/addnotes', fetchuser ,[
    body('title', 'Enter a valid email').isLength({min: 3}),
    body('description', 'Description should be atleast 5 charchter long').isLength({min: 5})], 
    async(req,res)=>{
        try {
            const {title,description,tag} = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const notes = new Notes({title,description,tag,user:req.user.id});
            const savednotes=await notes.save();
            res.json(savednotes);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server error");
        }
        
})

//ROUTE 3: Update a note using PUT  "/api/notes/updatenote" . Login reuired

router.put('/updatenote/:id', fetchuser ,async(req,res)=>{
    const {title,description,tag} = req.body

    //creating a new notes
    try {
        const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note = await Notes.findById(req.params.id);

    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString()!== req.user.id){
        return res.status(404).send("Not Allowed")
    }

    note =await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true});

    res.json({note})
    } catch (error) {
        console.log(error.message);
            res.status(500).send("Internal Server error");
    }
})


//Route 4: Delete a note using DELETE  "/api/notes/deltenote" . Login reuired
router.put('/deletenote/:id', fetchuser ,async(req,res)=>{


    //finding the note to be deleted
    try {
        let note = await Notes.findById(req.params.id);

    //allow user to delte if it fullfill the condition
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString()!== req.user.id){
        return res.status(404).send("Not Allowed")
    }

    note =await Notes.findByIdAndDelete(req.params.id);

    res.json({"Success":"Noted deleted" })
    } catch (error) {
        console.log(error.message);
            res.status(500).send("Internal Server error");  
    }
})


module.exports=router; 