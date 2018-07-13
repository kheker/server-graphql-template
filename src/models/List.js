import mongoose, { Schema } from 'mongoose';

const ListSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
    },
    description: {
      type: String,
      trim: true,
    },
    expirationDate: {
      type: Date,
    },
    file: {
      type: String,
    },
    checklist: [
      {
        task: {
          type: String,
          trim: true,
        },
        complete: {
          type: Boolean,
          default: false,
        },
      },
    ],
    card: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Members',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('List', ListSchema);
