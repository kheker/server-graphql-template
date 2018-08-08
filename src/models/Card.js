import mongoogse, { Schema } from 'mongoose';

const CardSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  publicCard: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoogse.model('Card', CardSchema);
