import * as express from 'express';
import { handleVersion } from './version';

const app = express();
const version = "v2";

app.get(api('/'), handleVersion)

app.listen(8080, () => console.log("Mesh running on port 8080"))

function api(path: string) {
  return `/api/${version}${path}`
}