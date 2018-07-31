import mongoose, { Schema } from 'mongoose';

const TodoSchema = Schema({
  name: String,
  todoChain: {
    type: Schema.Types.ObjectId,
    ref: 'TodoChain',
    required: true,
  },
});

export default mongoose.model('Todo', TodoSchema);
