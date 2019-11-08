import * as express from 'express';

const app = express();
const version = "v2";

app.get(api('/'), (req, res) => res.send("bla"))

function api(path: string) {
  return `/api/${version}${path}`
}