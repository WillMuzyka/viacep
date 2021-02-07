import Address from '../models/Address';

interface IAddressesRepository {
  create(addressData: Address): Promise<Address>;
  findByCep(cep: string): Promise<Address | undefined>;
}

export default IAddressesRepository;
