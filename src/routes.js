import { Router } from 'express';

import CustomerController from './app/controllers/CustomerController';

const routes = new Router();

routes.get('/customer', CustomerController.index);
routes.post('/customer', CustomerController.store);
routes.put('/customer/:id', CustomerController.update);
routes.delete('/customer/:id', CustomerController.delete);

export default routes;
