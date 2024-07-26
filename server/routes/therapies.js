const express = require('express');
const router = express.Router();
const Therapy = require('../schemas/Therapy')

router.post('/newTherapy', async(req,res,next)=>{
    console.log(req)
})
module.exports = router