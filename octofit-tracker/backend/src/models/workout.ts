import mongoose, { InferSchemaType, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    targetGoals: [{ type: String }],
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number },
        reps: { type: Number },
        seconds: { type: Number },
      },
    ],
    assignedTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { collection: 'workouts', timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = mongoose.models.Workout || mongoose.model<Workout>('Workout', workoutSchema);