import express from 'express';
import { rootRouter } from './api/root';
import { initMesh } from './bootstrap';

const app = express();
const validVersions = ['v1', 'v2'];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})

app.use(`/api/:version`, (req, res, next) => {
  if (!validVersions.includes(req.params.version)) {
    return res.sendStatus(404);
  }
  next();
})

app.use(`/api/:version`, rootRouter)


initMesh()
.then(() => app.listen(8080, () => console.log("Mesh running on port 8080")))

