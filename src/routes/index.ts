import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import AddressesController from '../controllers/AddressesController';

const router = Router();
const addressesController = new AddressesController();

router.get(
  '/:cep',
  celebrate({
    [Segments.PARAMS]: {
      cep: Joi.string().length(8).required(),
    },
  }),
  addressesController.index,
);

export default router;
