import { Router } from 'express';

import CustomerController from './app/controllers/CustomerController';

const routes = new Router();

routes.post('/customer', CustomerController.store);
routes.put('/customer/:id', CustomerController.update);

export default routes;
