import express from 'express';
import { apiBaseUrl } from './config/api.js';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username firstName lastName').lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(
    await Activity.find()
      .populate('user', 'username firstName lastName')
      .sort({ date: -1 })
      .lean(),
  );
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(
    await Leaderboard.find()
      .populate('user', 'username firstName lastName')
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean(),
  );
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }).lean());
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Octofit Tracker API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Error starting Octofit Tracker API:', error);
  process.exitCode = 1;
});
