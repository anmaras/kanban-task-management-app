import mongoose from 'mongoose';

const SubTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  subtasks: [SubTaskSchema],
});

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  color: { type: String, require: true },
  tasks: [TaskSchema],
});

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  columns: [ColumnSchema],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: { type: Boolean },
});

ColumnSchema.pre('save', function (next) {
  if (!this.color) {
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  next();
});

export default mongoose.model('Board', BoardSchema);
