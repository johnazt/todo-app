const express = require('express');

const router = express.Router();
const todoController = require('../controllers/todoController.js');

/**
 * Todo Routes
 * Base path: /api
 */

router.get('/todos', todoController.getAllTodos);
router.get('/todos/:id', todoController.getTodoById);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
