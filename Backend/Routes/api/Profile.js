const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



//@route GET api/profile/me
//@desc     Test route
//@access   Private
router.get('/me', auth, async (req, res) => {
   try {
       const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

       if (!profile) return res.status(400).json({ msg: 'No profile available for this user' });
       res.json(profile);
   } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error')
   }
});


//@route GET api/profile
//@desc     Profile route
//@access   Public

router.get('/', async (req, res)=> {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'email']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/profile/user/:user_id
//@desc     Profile route
//@access   Public

router.get('/user/:user_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email']);

        if (!profile) return res.status(400).json({ msg: 'No profile for the specified user' });
        res.json(profile);
    } catch (error) {
        if (error.kind == 'ObjectId') return res.status(400).json({ msg: 'No profile for the specified user' });
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});



//@route POST api/profile
//@desc     Test route
//@access   Private
router.post('/', auth, async (req, res) => {
    

    const { location, facebook, twitter, instagram, aboutMe } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    
    if(location) profileFields.location = location;
    if (aboutMe) profileFields.aboutMe = aboutMe;

    profileFields.social = {};

    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
 

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
                $set: profileFields
            }, { new: true });
            
            return res.json(profile);
        }
        
        //Create Profile
        profile = new Profile(profileFields);
        
        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');   
    }
});


//@route DELETE api/profile
//@desc     Profile route
//@access   Private

router.delete('/', auth, async (req, res) => {
    //Remove Profile
    const deleteProfile = await Profile.findOneAndRemove({ user: req.user.id });
    if (!deleteProfile) return res.status(400).json({ msg: 'User profile not found or already deleted' })

    //Remove User
    const deleteUser = await User.findOneAndRemove({ _id: req.user.id });
    if (!deleteUser) return res.status(400).json({ msg: 'User not found or already deleted' });
    res.json({ msg: 'User Deleted' });
});


module.exports = router;