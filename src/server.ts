import express from 'express';
import cors from 'cors';
import { apiRoutes } from './router/routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/clinic', apiRoutes);

server.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 'page not found',
  });
});

server.listen(2323, () => {
  console.log('server running');
});
