import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../errors/AppError';
import GetAddressService from '../services/GetAddressService';

class AddressesController {
  // eslint-disable-next-line consistent-return
  public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const cepNumber = parseInt(req.params.cep, 10);

      const getAddress = container.resolve(GetAddressService);
      const address = await getAddress.execute(cepNumber);

      return res.json(address);
    } catch (err) {
      next(new AppError(
        err.message || 'Error getting CEP address information',
        err.status || 400,
      ));
    }
  }
}

export default AddressesController;
