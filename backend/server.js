import express from 'express';
import authRoutes from './router/auth.route.js';
import movieRoutes from './router/movie.route.js';
import tvRoutes from './router/tv.route.js';
import searchRoutes from './router/search.route.js';
import { env_Vars } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from "./middleware/protectRoute.js";
import cookieParser from 'cookie-parser';
import path from "path"

const app = express();

const PORT = env_Vars.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

if(env_Vars.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  console.log("server start at http://localhost:" + PORT);
  connectDB();
})