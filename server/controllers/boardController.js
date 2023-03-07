import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { checkForDuplicateInputs } from '../utils/helpers.js';

//CREATE BOARD
const createBoard = async (req, res) => {
  const { name, columns } = req.body;

  //check if values exist
  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  //the newest board is set to active and the rest to false
  await Board.updateMany(
    { userId: req.user.userId },
    { $set: { isActive: false } }
  );

  const boards = await Board.find({ userId: req.user.userId });

  //check if there is a board with the same name
  const isNameUnique = boards.find((board) => board.name === name);

  //check if column names are unique and return the indexes that contain the error
  const { isColumnUnique, indexes } = checkForDuplicateInputs(columns);

  if (isNameUnique) {
    throw new BadRequestError(
      JSON.stringify({ name: 'Board name already in use!' })
    );
  }

  if (!isColumnUnique) {
    throw new BadRequestError(JSON.stringify({ array: indexes }));
  }

  // create the main board
  const board = await Board.create({
    name,
    columns,
    userId: req.user.userId,
    isActive: true,
  });

  res.status(StatusCodes.CREATED).json(board);
};

//GET ALL USER BOARDS
const getAllBoards = async (req, res) => {
  //Find the specific user boards
  const boards = await Board.find({ userId: req.user.userId });

  if (!boards) {
    throw new NotFoundError(`No board with id${req.user.userId}`);
  }

  const activeBoard = boards.find((board) => board.isActive === true);

  //return the boards, the amount and the selected created board is the active board Id
  res.status(StatusCodes.OK).json({
    boards,
    totalBoards: boards.length,
    activeBoardId: boards.length > 0 ? activeBoard?._id : '',
  });
};

//DELETE BOARD
const deleteBoard = async (req, res) => {
  const { id } = req.params;

  //find current next and previous boards
  const board = await Board.findOne({ _id: id, userId: req.user.userId });
  const nextBoard = await Board.findOne({
    _id: { $gt: id },
    userId: req.user.userId,
  });
  const previousBoard = await Board.findOne({
    _id: { $lt: id },
    userId: req.user.userId,
  }).sort({
    _id: -1,
  });

  if (!board) {
    throw new NotFoundError(`No board with id${id}`);
  }

  //delete selected board
  await board.remove();

  //when current board is deleted check if there is one after to set it active.
  //if there is not a next one set active the previous one.
  if (nextBoard) {
    nextBoard.isActive = true;
    await nextBoard.save();
  } else if (previousBoard) {
    previousBoard.isActive = true;
    await previousBoard.save();
  }

  res.status(StatusCodes.OK).send({ board, nextBoard, previousBoard });
};

//UPDATE BOARD AND COLUMNS NAMES
const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { name, columns } = req.body;

  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  //Find the selected board
  const board = await Board.findOne({ _id: id, userId: req.user.userId });
  // const boards = await Board.find({ userId: req.user.userId });

  //if board doesn't exist throw error
  if (!board) {
    throw new NotFoundError(`No board with id ${id}`);
  }

  //check if there is a board with the same name
  // const isNameUnique = boards.find((board) => board.name === name);

  //check if column names are unique and return the indexes that contain the error
  const { isColumnUnique, indexes } = checkForDuplicateInputs(columns);

  // if (isNameUnique && name !== ) {
  //   throw new BadRequestError(
  //     JSON.stringify({ name: 'Board name already in use!' })
  //   );
  // }

  if (!isColumnUnique) {
    throw new BadRequestError(JSON.stringify({ array: indexes }));
  }

  const updatedColumns = columns.map((column) => {
    //If column does not have a property color
    if (!column.color) {
      // Add color property to column with a random color
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      return { ...column, color };
    }
    return column;
  });

  const updatedBoard = await Board.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    { name, columns: updatedColumns },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json(updatedBoard);
};

/* SET ACTIVE BOARD */
const selectActive = async (req, res) => {
  const { id } = req.params;

  //set all todos to is active false
  await Board.updateMany(
    { userId: req.user.userId },
    { $set: { isActive: false } }
  );

  //update the current todo to isActive true
  const updatedBoard = await Board.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json(updatedBoard);
};

/* ---------------- */
/* ---- TASKS ----- */
/* ---------------- */

/* CREATE BOARD TASK */
const createBoardTask = async (req, res) => {
  const { id, columnId } = req.params;
  const { title, description, subtasks } = req.body;

  //find the board
  const board = await Board.findOne({ _id: id });

  //check if board exist
  if (!board) {
    throw new NotFoundError(`No board with id ${id}`);
  }

  //find the column
  const column = board.columns.find(
    (column) => column._id.toString() === columnId
  );
  //check if column exist
  if (!column) {
    throw new NotFoundError(`No column with id ${id}`);
  }

  //create task
  const task = {
    title,
    description,
    subtasks,
  };

  //put the task in the column
  column.tasks.push(task);

  //save the board
  await board.save();

  res.status(StatusCodes.CREATED).json(board);
};

/* EDIT SUBTASK */
const editSubtask = async (req, res) => {
  const { boardId, columnId, taskId, subId } = req.params;

  //Find board
  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  //Find column
  const column = board.columns.find((col) => col._id.toString() === columnId);

  if (!column) {
    throw new NotFoundError(`No column with id ${columnId}`);
  }

  //Find task
  const task = column.tasks.find((task) => task._id.toString() === taskId);

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  //Find subtask
  const subtask = task.subtasks.find((sub) => sub._id.toString() === subId);

  if (!subtask) {
    throw new NotFoundError(`No subtask with id ${subId}`);
  }

  //Update subtask value
  subtask.title = subtask.title;
  subtask.isCompleted = !subtask.isCompleted;

  await board.save();

  res.status(StatusCodes.OK).json({ task, board });
};

//MOVE TASKS
const moveTask = async (req, res) => {
  const { boardId, fromId, taskId } = req.params;
  const { toId, activeTask } = req.body;

  //find board
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  //find the column that the task will move out
  const fromColumn = board.columns.find((col) => col._id.toString() === fromId);
  if (!fromColumn) {
    throw new NotFoundError(`No From column with id ${fromId}`);
  }

  //find the task index
  const taskIndex = fromColumn.tasks.findIndex(
    (task) => task._id.toString() == taskId
  );

  const task = fromColumn.tasks[taskIndex];

  //find the toColumn that the task will go
  const toColumn = board.columns.find(
    (column) => column._id.toString() === toId
  );

  if (!toColumn) {
    throw new NotFoundError(`No To column with id ${toId}`);
  }

  if (fromColumn._id.toString() === toColumn._id.toString()) {
    res.status(StatusCodes.OK).json({ board, fromColumn });
    return;
  }

  fromColumn.tasks.splice(taskIndex, 1);
  toColumn.tasks.splice(toColumn.tasks.length, 0, task);

  await board.save();

  res.status(StatusCodes.OK).json({ board, toColumn });
};

/* DELETE TASK */
const deleteTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;

  //find board
  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    throw new NotFoundError(`No board with id${boardId}`);
  }

  //find column[]
  const column = board.columns.find((col) => col._id.toString() === columnId);

  if (!column) {
    throw new NotFoundError(`No column with id${columnId}`);
  }

  //find taskIndex in column
  const taskIndex = column.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  //remove task
  column.tasks.splice(taskIndex, 1);

  await board.save();

  res.status(StatusCodes.OK).json(board);
};

/* EDIT TASK */
const editTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;
  const { title, description, subtasks, columnId: colDestId } = req.body;
  //find board
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new NotFoundError(`No board with id${boardId}`);
  }

  //find source column
  const sourceColumn = board.columns.find(
    (col) => col._id.toString() === columnId
  );

  if (!sourceColumn) {
    throw new NotFoundError(`No column with id${columnId}`);
  }

  //find task in source column
  const taskIndex = sourceColumn.tasks.findIndex(
    (task) => task._id.toString() === taskId
  );

  if (taskIndex === -1) {
    throw new NotFoundError(`No task with id${taskId}`);
  }

  const task = sourceColumn.tasks[taskIndex];

  task.title = title;
  task.description = description;
  task.subtasks = subtasks;

  //create new task from task

  //change column of task
  if (colDestId && columnId !== colDestId) {
    //find destination column
    const destColumn = board.columns.find(
      (col) => col._id.toString() === colDestId
    );

    if (!destColumn) {
      throw new NotFoundError(`No destination column with id${colDestId}`);
    }

    // //remove task from source column
    sourceColumn.tasks.splice(taskIndex, 1);

    // //add task to destination column
    destColumn.tasks.push(req.body);
  }

  await board.save();

  res.status(StatusCodes.OK).json(board);
};

/*DND TASKS  */
const dndTask = async (req, res) => {
  const { destination, source } = req.body;
  const { boardId } = req.params;

  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  if (!destination) {
    throw new NotFoundError(`No destination column found`);
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
  const sourceCol = board.columns.find(
    (col) => col._id.toString() === source.droppableId
  );

  const destinationCol = board.columns.find(
    (col) => col._id.toString() === destination.droppableId
  );

  if (!sourceCol || !destinationCol) {
    throw new NotFoundError('Source or Destination Columns not found');
  }

  const task = sourceCol.tasks[source.index];

  if (sourceCol._id.toString() === destinationCol._id.toString()) {
    sourceCol?.tasks?.splice(source.index, 1);
    sourceCol?.tasks?.splice(destination.index, 0, task);

    const newSourceCol = {
      ...sourceCol,
      tasks: sourceCol.tasks,
    };

    (board.columns = board.columns.map((col) =>
      col?._id === source.droppableId ? newSourceCol : col
    )),
      await board.save();

    res.status(StatusCodes.OK).json(board);

    return;
  }

  sourceCol.tasks.splice(source.index, 1);

  const newSourceCol = {
    ...sourceCol,
    tasks: sourceCol.tasks,
  };

  destinationCol.tasks.splice(destination.index, 0, task);

  const newDestCol = {
    ...destinationCol,
    tasks: destinationCol.tasks,
  };

  (board.columns = board.columns.map((col) =>
    col._id === source.droppableId
      ? newSourceCol
      : col._id === destination.droppableId
      ? newDestCol
      : col
  )),
    await board.save();

  res.status(StatusCodes.OK).json(board);
};

export {
  createBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
  selectActive,
  createBoardTask,
  editSubtask,
  moveTask,
  deleteTask,
  editTask,
  dndTask,
};
