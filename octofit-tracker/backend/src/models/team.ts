import mongoose, { InferSchemaType, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'teams', timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const TeamModel = mongoose.models.Team || mongoose.model<Team>('Team', teamSchema);