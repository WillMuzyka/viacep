import Address from '../models/Address';

interface IAddressesRepository {
  create(addressData: Address): Promise<Address>;
  findByCep(cep: number): Promise<Address | undefined>;
}

export default IAddressesRepository;
