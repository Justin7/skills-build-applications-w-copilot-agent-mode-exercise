import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userIds = {
  maya: new mongoose.Types.ObjectId('672000000000000000000001'),
  leo: new mongoose.Types.ObjectId('672000000000000000000002'),
  nora: new mongoose.Types.ObjectId('672000000000000000000003'),
};
const teamId = new mongoose.Types.ObjectId('672000000000000000000101');
const activityIds = [
  new mongoose.Types.ObjectId('672000000000000000000201'),
  new mongoose.Types.ObjectId('672000000000000000000202'),
  new mongoose.Types.ObjectId('672000000000000000000203'),
];
const leaderboardIds = [
  new mongoose.Types.ObjectId('672000000000000000000301'),
  new mongoose.Types.ObjectId('672000000000000000000302'),
  new mongoose.Types.ObjectId('672000000000000000000303'),
];
const workoutIds = [
  new mongoose.Types.ObjectId('672000000000000000000401'),
  new mongoose.Types.ObjectId('672000000000000000000402'),
  new mongoose.Types.ObjectId('672000000000000000000403'),
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(connectionString);

  try {
    const joinedAt = new Date('2025-01-15T00:00:00.000Z');
    const users = [
      { _id: userIds.maya, username: 'maya.moves', email: 'maya@example.com', firstName: 'Maya', lastName: 'Chen', joinedAt },
      { _id: userIds.leo, username: 'leo.runner', email: 'leo@example.com', firstName: 'Leo', lastName: 'Martinez', joinedAt },
      { _id: userIds.nora, username: 'nora.strong', email: 'nora@example.com', firstName: 'Nora', lastName: 'Williams', joinedAt },
    ];
    for (const user of users) {
      await User.updateOne({ _id: user._id }, { $set: user }, { upsert: true, runValidators: true });
    }

    await Team.updateOne(
      { _id: teamId },
      {
        $set: {
          name: 'Sunrise Striders',
          description: 'A supportive crew building a consistent morning running habit.',
          members: [userIds.maya, userIds.leo, userIds.nora],
        },
      },
      { upsert: true, runValidators: true },
    );

    const now = new Date();
    const activities = [
      { _id: activityIds[0], user: userIds.maya, type: 'run', durationMinutes: 32, distanceKm: 5.2, calories: 310, date: new Date(now.getTime() - 86_400_000) },
      { _id: activityIds[1], user: userIds.leo, type: 'cycle', durationMinutes: 48, distanceKm: 18.5, calories: 420, date: new Date(now.getTime() - 172_800_000) },
      { _id: activityIds[2], user: userIds.nora, type: 'walk', durationMinutes: 40, distanceKm: 3.4, calories: 185, date: new Date(now.getTime() - 259_200_000) },
    ];
    for (const activity of activities) {
      await Activity.updateOne(
        { _id: activity._id },
        { $set: activity },
        { upsert: true, runValidators: true },
      );
    }

    const leaderboard = [
      { _id: leaderboardIds[0], user: userIds.maya, team: teamId, points: 860, rank: 1, period: 'weekly' },
      { _id: leaderboardIds[1], user: userIds.leo, team: teamId, points: 740, rank: 2, period: 'weekly' },
      { _id: leaderboardIds[2], user: userIds.nora, team: teamId, points: 620, rank: 3, period: 'weekly' },
    ];
    for (const entry of leaderboard) {
      await Leaderboard.updateOne(
        { _id: entry._id },
        { $set: entry },
        { upsert: true, runValidators: true },
      );
    }

    const workouts = [
      {
        _id: workoutIds[0],
        name: 'Easy 5K Builder',
        description: 'A relaxed aerobic session to build running endurance.',
        category: 'cardio',
        durationMinutes: 35,
        difficulty: 'beginner',
        exercises: [
          { name: 'Brisk walk warm-up', durationSeconds: 300 },
          { name: 'Easy jog', durationSeconds: 1500 },
          { name: 'Cool-down walk', durationSeconds: 300 },
        ],
      },
      {
        _id: workoutIds[1],
        name: 'Full Body Basics',
        description: 'A balanced strength circuit using simple bodyweight movements.',
        category: 'strength',
        durationMinutes: 30,
        difficulty: 'beginner',
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Glute bridge', sets: 3, reps: 15 },
        ],
      },
      {
        _id: workoutIds[2],
        name: 'Post-Run Mobility',
        description: 'A gentle flexibility routine for recovery after a run.',
        category: 'flexibility',
        durationMinutes: 15,
        difficulty: 'beginner',
        exercises: [
          { name: 'Standing calf stretch', durationSeconds: 45 },
          { name: 'Hip flexor stretch', durationSeconds: 45 },
          { name: 'Hamstring stretch', durationSeconds: 45 },
        ],
      },
    ];
    for (const workout of workouts) {
      await Workout.updateOne(
        { _id: workout._id },
        { $set: workout },
        { upsert: true, runValidators: true },
      );
    }

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);
    console.log(
      `Database seeding complete: ${counts[0]} users, ${counts[1]} teams, ${counts[2]} activities, ${counts[3]} leaderboard entries, ${counts[4]} workouts`,
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
