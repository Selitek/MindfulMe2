const multer = require('multer');
const Post = require('../models/Post');
const Rating = require('../models/Rating');
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
        const {textContent} = req.body;
        const userId = req.user._id;
        console.log(`user id: ${userId}`);
        
   
       const result = await cloudinary.uploader.upload(req.file.path);
       console.log(`type of cloudinaryId ${typeof result.public_id}`)
       console.log(result)
        //const imageContent = req.file.path; // Path to the uploaded image file

        //Generate Id
        const postId = await generatePostId();
        // Create a new post object
        const newPost = new Post({
            user:userId,
            imageContent: result.secure_url,
            cloudinaryId: result.public_id,
            _id: postId,
            textContent: textContent
        });

        // Save the post to the database
        await newPost.save();

        // Function to add a new movie

    try {
        if (postId !== 0) {
            // Get the existing ratings matrix
            let ratings = await Rating.findOne();
            let ratingsMatrix = ratings.ratingsMatrix;

            // Add a new row (array of zeros) for the new movie
            ratingsMatrix.push(new Array(ratingsMatrix[0].length).fill(0));

            // Save the updated ratings matrix
            await Rating.updateOne({}, { ratingsMatrix: ratingsMatrix });

            console.log(`Movie ${postId} added to rating matrix successfully.`);
        } else {
            console.log('Post ID is 0. No new row added.');
        }
    } catch (error) {
        console.error('Error adding movie:', error);
    }


        console.log('post has been added!')
            res.redirect('/')
        // Redirect to a success page or send a success response
       // res.status(201).send('Post created successfully!');
    } catch (err) {
        console.error('Error creating post:', err);
       // res.status(500).send('Internal Server Error');
    }
};