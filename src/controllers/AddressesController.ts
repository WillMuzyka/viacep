import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../errors/AppError';
import GetAddressService from '../services/GetAddressService';

class AddressesController {
  // eslint-disable-next-line consistent-return
  public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const cepNumber = req.params.cep;

      const getAddress = container.resolve(GetAddressService);
      const address = await getAddress.execute(cepNumber);

      return res.json(address);
    } catch (err) {
      next(new AppError(
        err.message || 'Erro ao obter informações do CEP',
        err.status || 400,
      ));
    }
  }
}

export default AddressesController;
