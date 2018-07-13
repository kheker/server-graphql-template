import mongoose, { Schema } from 'mongoose';

const MemberSchema = new Schema({
  role: {
    type: String,
    enum: ['admin', 'moderator', 'observer'],
    required: [true, 'Select a role for this member.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required.'],
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'Team is required'],
  },
});

export default mongoose.model('Member', MemberSchema);
