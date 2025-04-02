import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderEmail: string;
  subject: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
  reply?: string;
  replySubject?: string; // New field
  repliedAt?: Date;
}

const messageSchema: Schema = new Schema({
  senderEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  reply: {
    type: String,
    trim: true
  },
  replySubject: { // New field
    type: String,
    trim: true
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;