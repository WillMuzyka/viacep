import { inject, injectable } from 'tsyringe';
import httpGet from '../utils/http';
import AppError from '../errors/AppError';

import IAddressesRepository from '../database/repositories/IAddressesRepository';

interface IAddressDTO {
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

@injectable()
class GetAddress {
  constructor(
    @inject('AddressesRepository')
    private AddressesRepository: IAddressesRepository,
  ) {}

  public async execute(cepNumber: number): Promise<IAddressDTO> {
    try {
      const addressFromDb = await this.AddressesRepository.findByCep(cepNumber);
      if (addressFromDb) return addressFromDb;

      const viaCepResponse = await httpGet<IAddressDTO>(`https://viacep.com.br/ws/${cepNumber}/json/`);
      const formattedResponse = {
        ...viaCepResponse,
        cep: cepNumber,
      };

      await this.AddressesRepository.create(formattedResponse);

      return formattedResponse;
    } catch (e) {
      throw new AppError(e.message || 'Server error on trying to get CEP address', 500);
    }
  }
}

export default GetAddress;
