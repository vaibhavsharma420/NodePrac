const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');


router.post('/', async(req,res)=>{
  
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);
  
        const response = await newMenuItem.save();
        console.log('data-saved',response);
        res.status(200).json(response);
  
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Hellu this is an error"});
    }
})

router.get('/', async(req,res)=>{

    try{
      const data = await MenuItem.find();
      console.log('data-fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error:"Hellu error hai"});
    }
})

router.get('/:taste', async(req,res)=>{

    try{
        const taste = req.params.taste;
        if(taste == 'sour' || taste == 'sweet' || taste == 'spicy'){
          const response = await MenuItem.find({taste:taste});
          console.log('response fetched');
          res.status(200).json(response);
        }else{
          res.status(404).json({error:'Invalid Taste'});
        }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
})

router.put('/:id', async(req,res)=>{

    try{
        const updatedId = req.params.id;
        const updatedBody = req.body;

        const response = await MenuItem.findByIdAndUpdate(updatedId,updatedBody,{
          new:true,
          runValidators:true,
        })
        if(!response){
          return res.status(404).json({error:'Item Not Found'});
        }
        console.log("data updated");
        res.status(200).json(response);

    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id', async(req,res)=>{

    try{

        const givenId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(givenId);

        if(!response){
          return res.status(404).json({error:'Item Not Found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});

    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;