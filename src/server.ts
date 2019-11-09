import express from 'express';
import { rootRouter } from './api/root';
import { initMesh } from './bootstrap';

const app = express();
const validVersions = ['v1', 'v2'];

app.use((req, res, next) => {
  const startHrTime = process.hrtime();
  const path = req.path;

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    console.log(`${req.method} ${path} ${elapsedTimeInMs}ms`);
  })

  next();
})

app.use((req, res, next) => {
  req.mesh = {} as any;
  next();
})

app.use(`/api/:version`, (req, res, next) => {
  if (!validVersions.includes(req.params.version)) {
    return res.sendStatus(404);
  }
  req.mesh.version = req.params.version;
  next();
})

app.use(`/api/:version`, rootRouter)


initMesh()
.then(() => app.listen(8080, () => console.log("Mesh running on port 8080")))

