const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const Stream = require('../../models/Stream');
const User = require('../../models/User');
const auth = require('../../middleware/auth')


//@route GET All api/streams
//@desc     Stream route
//@access   Private
router.get('/', auth, async (req, res) => {

try {
    
    const streams = await Stream.find().populate('user', ['name', 'email']);
    if (!streams) return res.status(400).jsong({ msg: 'No streams available' });
    res.json(streams);

} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}


    res.send('Stream route');
});

//@route GET api/streams/me
//@desc Stream route
//@access Private
router.get('/me', auth, async (req, res)=> {
       
    try {
        const stream = await Stream.findOne({ user: req.user.id })
        if (!stream) return res.status(400).json({ msg: 'No Stream available for this User' })
    
        res.json(stream);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
    
});

//@route POST api/profile/me
//@desc     Test route
//@access   Private

router.post('/', [auth, [
        check('name', 'Please Stream name is required').not().isEmpty(),
        check('category', 'Please select a gategory').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, category, description } = req.body;
 
    const streamFields = {};
    streamFields.user = req.user.id;

    if (name) streamFields.name = name;
    if (category) streamFields.category = category;
    if (description) streamFields.description = description;


    try {
        let stream = await Stream.findOne({ user: req.user.id });

        if (stream) {
            //Update
            stream = await Stream.findOneAndUpdate({ user: req.user.id },
                { $set: streamFields }, 
                { new: true });
                return res.json(stream);
    }

        stream = new Stream(streamFields);
        await stream.save();

        res.json(stream);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

router.delete('/me', auth, async (req, res)=>{
    const deleteStream = await Stream.findOneAndRemove({ user: req.user.id });

    if (!deleteStream) return res.status(400).json({ msg: 'Stream not found or already deleted' });
    res.json({ msg: 'Stream Deleted' });
});

router.delete('/:user_id', auth, async (req, res)=>{
    const deleteStream = await Stream.findOneAndRemove({ user: req.params.user_id });

    if (!deleteStream) return res.status(400).json({ msg: 'Stream not found or already deleted' });
    res.json({ msg: 'Stream Deleted' });
});


module.exports = router;