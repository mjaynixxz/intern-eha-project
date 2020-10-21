const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const express = require('express');
const router = express.Router();

const User = require('../../models/User');



//@route POST api/users
//@desc     Register route
//@access   Public
router.post('/', [
    check('name', 'Please enter a valid name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must not be less than 6 characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // check if user already exist
        let user = await User.findOne({ email });
        
        if (user) return res.status(500).json({ errors: [{ msg: 'User already exist' }] });
        
        user = await new User({
            name,
            email,
            password
        });

        //hash password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        //save user
        await user.save();
        
        //sign jwt token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err)  throw err;
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

        
    }
});
module.exports = router;