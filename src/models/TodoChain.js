import mongoogse, { Schema } from 'mongoose';

const TodoChainSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
  },
});

export default mongoogse.model('TodoChain', TodoChainSchema);
