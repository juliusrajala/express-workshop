import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { serverPort } from './config';
import { createDataMiddleware } from './middleware/data';
import { loggerMiddleware } from './middleware/logger';

const app = express();
const port = serverPort;

app.use(cors());

app.use(createDataMiddleware());

app.use(loggerMiddleware)

app.use(bodyParser.json());
// localhost:8080/api/ulid
app.use('/api', routes);

const startServer = async () =>
  new Promise(resolve => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(null);
    });
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });

startServer();
