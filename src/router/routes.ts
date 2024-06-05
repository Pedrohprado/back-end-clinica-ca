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
  deleteVacine,
  showAllVacines,
  showVacineByAnimal,
  updateVacine,
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
apiRoutes.post('/newpatients/:id', registerNewPatients); //my router call a array of functions
apiRoutes.put('/updatepatient/:id', updatePatients);
apiRoutes.delete('/deletepatient/:id', deletePatient);

// routes for Vacina
apiRoutes.get('/vacines', showAllVacines);
apiRoutes.get('/vacine/:idAnimal', showVacineByAnimal);
apiRoutes.post('/newvacine/:idAnimal', createNewVacine);
apiRoutes.put('/updatevacine/:idVacine', updateVacine);
apiRoutes.delete('/deletevacine/:idVacine', deleteVacine);
