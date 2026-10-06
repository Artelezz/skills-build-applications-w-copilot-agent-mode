import express from 'express';
import { connectToDatabase } from './config/database.js';
import { ActivityModel, LeaderboardModel, TeamModel, UserModel, WorkoutModel } from './models/index.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ displayName: 1 }).lean();
    response.json({ users });
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    const teams = await TeamModel.find().populate('members', 'displayName username').sort({ name: 1 }).lean();
    response.json({ teams });
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'displayName username')
      .populate('team', 'name')
      .sort({ activityDate: -1 })
      .lean();
    response.json({ activities });
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('user', 'displayName username')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();
    response.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().populate('assignedTeam', 'name').sort({ title: 1 }).lean();
    response.json({ workouts });
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
  });