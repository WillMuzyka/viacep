import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetAddressService from '../services/GetAddressService';

class AddressesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const cepNumber = parseInt(req.params.cep, 10);

    const getAddress = container.resolve(GetAddressService);
    const address = await getAddress.execute(cepNumber);

    return res.json(address);
  }
}

export default AddressesController;
