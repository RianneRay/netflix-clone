import express from 'express';
import authRoutes from './router/auth.route.js';
import movieRoutes from './router/movie.route.js';
import { env_Vars } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = env_Vars.PORT;

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);

app.listen(PORT, () => {
  console.log("server start at http://localhost:" + PORT);
  connectDB();
})