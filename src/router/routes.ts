import express from 'express';
import {
  deletePatient,
  registerNewPatients,
  showAllPatients,
  showPatientsByClient,
  updatePatients,
} from '../controllers/controllerPatients';

import {
  deleteClient,
  registerNewClients,
  showAllClients,
  updateClient,
} from '../controllers/controllerClients';
import {
  createNewVacine,
  showAllVacines,
  showVacineByAnimal,
} from '../controllers/controllerVacine';

export const apiRoutes = express.Router();

//routes for Clients
apiRoutes.get('/clients', showAllClients);
apiRoutes.post('/newclient', registerNewClients);
apiRoutes.put('/updateclient/:id', updateClient);
apiRoutes.delete('/deleteclient/:id', deleteClient);

// routes for Animals
apiRoutes.get('/patients', showAllPatients);
apiRoutes.get('/patients/:id', showPatientsByClient);
apiRoutes.post('/newpatients/:id', registerNewPatients);
apiRoutes.put('/updatepatient/:id', updatePatients);
apiRoutes.delete('/deletepatient/:id', deletePatient);

// routes for Vacina
apiRoutes.get('/vacines', showAllVacines);
apiRoutes.get('/vacine/:idAnimal', showVacineByAnimal);
apiRoutes.post('/newvacine/:idAnimal', createNewVacine);
