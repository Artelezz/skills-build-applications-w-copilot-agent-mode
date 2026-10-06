import mongoose, { InferSchemaType, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities', timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
export const ActivityModel = mongoose.models.Activity || mongoose.model<Activity>('Activity', activitySchema);