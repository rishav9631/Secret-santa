import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  giver: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
