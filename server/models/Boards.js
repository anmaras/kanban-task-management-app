import mongoose from 'mongoose';

const SubTaskSchema = new mongoose.Schema({
  title: { type: String },
  isCompleted: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true },
  description: { type: String },
  status: { type: String, require: true },
  subtasks: [SubTaskSchema],
});

const ColumnSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  tasks: [TaskSchema],
});

const BoardSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  columns: [ColumnSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

export default mongoose.model('Board', BoardSchema);