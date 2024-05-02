const multer = require('multer');
const Post = require('../models/Post');

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

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Rename uploaded files to avoid duplicates
    }
});
const upload = multer({ storage: storage });

// Controller to handle form submission for creating a post
exports.createPost = upload.single('imageContent'), async (req, res) => {
    try {
        // Extract form data
        const { textContent } = req.body;
        const imageContent = req.file.path; // Path to the uploaded image file

        // Create a new post object
        const newPost = new Post({
            textContent: textContent,
            imageContent: imageContent
        });

        // Save the post to the database
        await newPost.save();
        console.log('post has been added!')
            res.redirect('/todos')
        // Redirect to a success page or send a success response
       // res.status(201).send('Post created successfully!');
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send('Internal Server Error');
    }
};