const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
//const postController = require('../controllers/todos');
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

// Route to handle form submission for creating a post
router.post('/makepost', todosController.createPost)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router