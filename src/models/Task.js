import mongoose, { Schema } from 'mongoose';
import uuid4 from 'uuid4';

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name of task is required.'],
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['In progress', 'Done'],
      default: 'In progress',
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    subTask: [
      {
        _id: {type: String, default: uuid4()} ,
        name: {
          type: String,
          trim: true,
          required: [true, 'Name of Subtask is required.'],
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    expireDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', TaskSchema);
