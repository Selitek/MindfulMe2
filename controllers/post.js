const multer = require('multer');
const Post = require('../models/Post');
const cloudinary = require("../middleware/cloudinary");
// Helper function to generate a new user ID
async function generatePostId() {
    try {
        // Find the latest user from the user database
        const latestUser = await Post.findOne().sort({ _id: -1 });
        console.log(latestUser);
        // If there are no users in the database, return 1 as the post ID
        if (!latestUser) {
            return 1;
        }
        console.log(latestUser._id + 1);
        // Otherwise, return the latest user's ID incremented by 1

        return Number(latestUser._id) + 1;
    } catch (error) {
        console.error('Error generating user ID:', error);
        throw error; // Throw error to handle it elsewhere
    }
}

// Controller for individual post page
exports.getPost = async (req, res) => {
    try {
        // Fetch the specific post from the database using its ID
        const post = await Post.findById(req.params.postId);

        // Render the individual post view and pass the post data to it
        res.render('post', { post: post });
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).send('Internal Server Error');
    }
};



// Controller to handle form submission for creating a post
exports.createPost = async (req, res, next) => {
    try {
        // Extract form data
        const { textContent } = req.body;
   
       const result = await cloudinary.uploader.upload(req.file.path);
       console.log(result)
        //const imageContent = req.file.path; // Path to the uploaded image file

        //Generate Id
        const userId = await generatePostId();
        // Create a new post object
        const newPost = new Post({
            imageContent: result.secure_url,
            cloudinaryId: result.public_id,
            _id: userId,
            textContent: textContent
        });

        // Save the post to the database
        await newPost.save();
        console.log('post has been added!')
            res.redirect('/todos')
        // Redirect to a success page or send a success response
       // res.status(201).send('Post created successfully!');
    } catch (err) {
        console.error('Error creating post:', err);
       // res.status(500).send('Internal Server Error');
    }
};