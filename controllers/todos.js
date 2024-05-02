const multer = require('multer');
const Post = require('../models/Post');
//todo
const Todo = require('../models/Todo')

//post
// Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/') // Destination directory for storing uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname) // Rename uploaded files to avoid duplicates
//     }
// });
// const upload = multer({ storage: storage });

// // Controller to handle form submission for creating a post
// exports.createPost = upload.single('imageContent'), async (req, res) => {
//     try {
//         // Extract form data
//         const { textContent } = req.body;
//         const imageContent = req.file.path; // Path to the uploaded image file

//         // Create a new post object
//         const newPost = new Post({
//             textContent: textContent,
//             imageContent: imageContent
//         });

//         // Save the post to the database
//         await newPost.save();
//         console.log('post has been added!')
//             res.redirect('/todos')
//         // Redirect to a success page or send a success response
//        // res.status(201).send('Post created successfully!');
//     } catch (err) {
//         console.error('Error creating post:', err);
//         res.status(500).send('Internal Server Error');
//     }
// };

module.exports = {
    createPost: async (req, res)=>{
        try{
            await Post.create({textContent: req.body})
            console.log('post has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    