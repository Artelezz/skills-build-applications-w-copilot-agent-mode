import mongoose, { InferSchemaType, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { collection: 'users', timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);