const Post = require('../Model/Post');
const User = require('../Model/User');

exports.createPost = async (req, res, next) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            owner: req.user._id,
            imageUrl: req.file
        };
        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        user.posts.push(post._id);
        await user.save();
        res.status(201).json({
            sucess: true,
            message: 'Post created successfully',
            post: post
        });
    } catch (error) {
        res.status(500).json({ 
            sucess: false,
            message: error.message 
        });
    }
};