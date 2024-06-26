const express = require('express');
const User = require('./userModel');
const mongoose = require('mongoose');
const auth = require('./checkauth');
                                                      
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { username, institute, className} = req.body;
    let sectionName;
    const category = req.session.category;
    await mongoose.connect("mongodb://localhost:27017/manashealth");
    const userEmail = req.session.userData.email;

    if (category==="Student") {
      sectionName = req.body.sectionName;
      if(!username || !institute || !className || !sectionName){
        console.log("no section name", sectionName);
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });

    }
    sectionName = (req.body.sectionName).toUpperCase();

    await User.findOneAndUpdate(
      {email:userEmail},
      { username, instituteName:institute, className, sectionName },
    );
  }else if(category==="Teacher"){
    if(!username || !institute ){
      return res.status(400).json({ success: false, message: 'Please fill in all fields' });
    }
    await User.findOneAndUpdate(
      {email:userEmail},
      { username, instituteName:institute },
    );
  }
     // Assuming you have user information in the request

    

    return res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error editing user profile:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
