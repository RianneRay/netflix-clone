import express from 'express';
import authRoutes from './router/auth.route.js';
import movieRoutes from './router/movie.route.js';
import tvRoutes from './router/tv.route.js';
import searchRoutes from './router/search.route.js';
import { env_Vars } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from 'cookie-parser';

const app = express();

const PORT = env_Vars.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  console.log("server start at http://localhost:" + PORT);
  connectDB();
})