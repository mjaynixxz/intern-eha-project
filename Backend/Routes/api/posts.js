const { check, validationResult } = require('express-validator')
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const Stream = require('../../models/Stream')



//@route Post api/posts
//@desc     Post route
//@access   Private
router.post('/',[ auth, [
    check('text', 'Please text is required').not().isEmpty()
] ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) return res.status(400).json({ msg: 'Invalid user' });

        const stream = await Stream.findOne({user: req.user.id});

        if (!stream) return res.status(400).json({ msg: 'Invalid Stream' });

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            user: req.user.id,
            stream: stream.id
        });

        const post = await newPost.save();

        res.json(post);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/post
//@desc     Get all post
//@access   Private

router.get('/', auth, async (req, res)=>{
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});


//@route GET api/posts/:id
//@desc     Get post by id
//@access   Private
router.get('/:id', auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) return res.status(400).json({ msg: 'No post found' });

        res.json(post)
    } catch (error) {
        if (error.kind =='ObjectId') return res.status(400).json({ msg: 'No post found' });
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

//@route DELETE api/posts/:id
//@desc Delete user post
//@access Private
router.delete('/:id', auth, async (req, res)=> {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(400).json({ msg: 'No post Found' });

        if (post.user.toString() !== req.params.id) return res.status(401).json({ msg: 'Authoriation Denied' });

        await post.remove();
        res.json({ msg: 'Post delete' })
        
    } catch (error) {
        if (error.kind =='ObjectId') return res.status(400).json({ msg: 'No post found' });
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@route PUT api/posts/likes/:id
//@desc Like a post
//@access Private

router.put('/likes/:id', auth, async (req, res) => {

try {
    
    //Find Post by ID
    const post = await Post.findById(req.params.id);

    //Check if Post exist 
    if (!post) return res.status(400).json({ msg: 'Post not found' });

    //Check to see if post has been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).lenth > 0) return res.stauts(400).json({ msg: 'Post already liked' });

    //Like post
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);

} catch (error) {
    if (error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
    console.error(error.message);
    res.status(500).send('Server Error')
}

    

});


//@route PUT api/posts/unlikes/:id
//@desc unlike a post
//@access Private

router.put('/unlikes/:id', auth, async (req, res) => {

    try {
        
        //Find Post by ID
        const post = await Post.findById(req.params.id);
    
        //Check if Post exist 
        if (!post) return res.status(400).json({ msg: 'Post not found' });
    
        //Check to see if post has not been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).lenth === 0) return res.stauts(400).json({ msg: 'Post has no yet been liked' });
    
        //Unike post

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        
        post.likes.splice(removeIndex, 1);
    
        await post.save();
    
        res.json(post.likes);
    
    } catch (error) {
        if (error.kind == 'ObjectId') return res.status(400).json({ msg: 'Post not found' });
        console.error(error.message);
        res.status(500).send('Server Error')
    }
    });

//@route Post api/posts/comments/:id
//@desc     Add comment to post
//@access   Private
router.post('/comments/:id',[ auth, [
    check('text', 'Please text is required').not().isEmpty()
] ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) return res.status(400).json({ msg: 'Invalid user' });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({ msg: 'No post available' });
 
         const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };
        post.comments.unshift(newComment)

         await post.save();

        res.json(post.comments);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@routes DELETE /api/posts/comment/:id/:comment_id
//@DESC Delete comment
//@ACCESS PRIVATE

router.delete('/comment/:id/:comment_id', auth, async (req, res)=>{

    try {
        //Fetch post
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({ msg: 'Post not found' });
        
        //Access to comment in posts
        const comments = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comments) return res.status(404).json({ msg: 'Comment not Found' });

        //Check for user

        if (post.comments.filter(comment => comment.user.toString() !== req.user.id )) return res.stauts(401).json({ msg: 'Unauthorized Access' });

        //Get index of comment
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
        
    } catch (error) {
        if (error.kind === 'ObjectId') return res.status(400).json({ msg: 'Comment not found' })
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;