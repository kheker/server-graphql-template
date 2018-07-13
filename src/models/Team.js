import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: 'General',
  },
  card: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'Card is required'],
  },
});

export default mongoose.model('Team', TeamSchema);
