const { check, validationResult } = require('express-validator');
const config = require('config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');



//@route GET api/auth
//@desc     auth route
//@access   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(400).json({ msg: 'Invalid credential'});
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(401).send('Unauthorized Access');
    }
   
});






//@route POST api/auth
//@desc auth route
//@access Public

router.post('/', [
    check('email', 'Please enter a vallid email address').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        
        if(!user) return res.status(400).json({ errors: [ {msg: 'Invalid Crendentials'} ]});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ]});

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({token});
        })
         
        
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;