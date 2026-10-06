import mongoose from 'mongoose';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      {
        username: 'ava_runner',
        email: 'ava@example.com',
        displayName: 'Ava Runner',
        age: 29,
        fitnessGoal: 'Improve 10K pace',
        joinedAt: new Date('2026-01-15T09:00:00Z'),
      },
      {
        username: 'marco_lifts',
        email: 'marco@example.com',
        displayName: 'Marco Lifts',
        age: 34,
        fitnessGoal: 'Build functional strength',
        joinedAt: new Date('2026-02-02T10:30:00Z'),
      },
      {
        username: 'nina_cycle',
        email: 'nina@example.com',
        displayName: 'Nina Cycle',
        age: 27,
        fitnessGoal: 'Train for a century ride',
        joinedAt: new Date('2026-03-10T14:15:00Z'),
      },
      {
        username: 'eli_yoga',
        email: 'eli@example.com',
        displayName: 'Eli Yoga',
        age: 31,
        fitnessGoal: 'Increase mobility and recovery',
        joinedAt: new Date('2026-04-18T08:45:00Z'),
      },
    ]);

    const teams = await TeamModel.insertMany([
      {
        name: 'Cardio Crew',
        motto: 'Every mile counts.',
        city: 'Seattle',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Strength Squad',
        motto: 'Progress under pressure.',
        city: 'Austin',
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await ActivityModel.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        activityDate: new Date('2026-10-01T12:00:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 510,
        activityDate: new Date('2026-10-02T18:30:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        type: 'Cycling',
        durationMinutes: 75,
        caloriesBurned: 720,
        activityDate: new Date('2026-10-03T07:15:00Z'),
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 160,
        activityDate: new Date('2026-10-04T16:45:00Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      { user: users[2]._id, team: teams[0]._id, points: 1840, rank: 1, streakDays: 12 },
      { user: users[1]._id, team: teams[1]._id, points: 1725, rank: 2, streakDays: 9 },
      { user: users[0]._id, team: teams[0]._id, points: 1680, rank: 3, streakDays: 7 },
      { user: users[3]._id, team: teams[1]._id, points: 1510, rank: 4, streakDays: 6 },
    ]);

    await WorkoutModel.insertMany([
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        targetGoals: ['Improve 10K pace', 'Increase aerobic capacity'],
        assignedTeam: teams[0]._id,
        exercises: [
          { name: 'Warm-up jog', seconds: 600 },
          { name: 'Tempo intervals', sets: 4, seconds: 300 },
          { name: 'Cool-down walk', seconds: 300 },
        ],
      },
      {
        title: 'Full-Body Strength Circuit',
        category: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 50,
        targetGoals: ['Build functional strength', 'Improve muscular endurance'],
        assignedTeam: teams[1]._id,
        exercises: [
          { name: 'Goblet squat', sets: 4, reps: 12 },
          { name: 'Push press', sets: 4, reps: 10 },
          { name: 'Renegade row', sets: 3, reps: 8 },
        ],
      },
      {
        title: 'Mobility Reset',
        category: 'Recovery',
        difficulty: 'Beginner',
        durationMinutes: 25,
        targetGoals: ['Increase mobility and recovery'],
        assignedTeam: teams[1]._id,
        exercises: [
          { name: 'Hip flow', seconds: 360 },
          { name: 'Thoracic rotations', sets: 3, reps: 8 },
          { name: 'Breathing cooldown', seconds: 240 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
