import { container } from 'tsyringe';
import IAddressesRepository from '../database/repositories/IAddressesRepository';
import AddressesRepository from '../database/repositories/AddressesRepository';

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);
