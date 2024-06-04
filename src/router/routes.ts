import express from 'express';
import {
  registerNewPatients,
  showAllPatients,
} from '../controllers/controllerPatients';

export const apiRoutes = express.Router();

apiRoutes.get('/patients', showAllPatients);
apiRoutes.post('/newpatients', registerNewPatients);
