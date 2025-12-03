import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  giver: {
    type: String,
    required: true,
    unique: true,
  },
  receiver: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
