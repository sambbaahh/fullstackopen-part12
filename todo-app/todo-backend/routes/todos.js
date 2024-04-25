const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
    next();
  } catch (e) {
    return res.sendStatus(404);
  }
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  let { text, done } = req.body;

  if (!text) {
    text = req.todo.text;
  }
  if (done === undefined) {
    done = req.todo.done;
  }

  await req.todo.update({
    text,
    done,
  });

  res.sendStatus(200);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
