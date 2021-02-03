import { inject, injectable } from 'tsyringe';
import httpGet from '../utils/http';
import AppError from '../errors/AppError';

import IAddressesRepository from '../database/repositories/IAddressesRepository';

interface IAddress {
  'cep': number | string;
  'logradouro': string;
  'complemento': string;
  'bairro': string;
  'localidade': string;
  'uf': string;
  'ibge': string;
  'gia': string;
  'ddd': string;
  'siafi': string;
}

interface IError {
  'cep': number;
  'erro': boolean;
}

function isError(obj: any): obj is IError {
  return 'erro' in obj;
}

@injectable()
class GetAddress {
  constructor(
    @inject('AddressesRepository')
    private AddressesRepository: IAddressesRepository,
  ) {}

  public async execute(cepNumber: number): Promise<IAddress | IError> {
    try {
      const addressFromDb = await this.AddressesRepository.findByCep(cepNumber);
      if (addressFromDb) return addressFromDb;
    } catch (e) {
      throw new AppError('Server error trying to get address from Database', 500);
    }

    try {
      const viaCepResponse = await httpGet<IAddress | IError>(`https://viacep.com.br/ws/${cepNumber}/json/`);
      if (isError(viaCepResponse)) {
        throw new AppError('CEP does not exist');
      }

      const formattedResponse = {
        ...viaCepResponse,
        cep: cepNumber,
      };

      try {
        await this.AddressesRepository.create(formattedResponse);
      } catch (e) {
        throw new AppError('Server error trying to save new CEP address on Database', 500);
      }

      return formattedResponse;
    } catch (e) {
      throw new AppError(e.message || 'Server error trying to get ViaCep address', 500);
    }
  }
}

export default GetAddress;
