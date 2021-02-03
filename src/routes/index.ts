import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';

const router = Router();
const addressesController = new AddressesController();

router.get('/:cep', addressesController.index);

export default router;
