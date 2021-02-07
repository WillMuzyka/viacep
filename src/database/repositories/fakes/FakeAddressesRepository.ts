import IAddressesRepository from '../IAddressesRepository';
import Address from '../../models/Address';

export default class AddressesRepository implements IAddressesRepository {
  private fakeRepository: Address[];

  constructor() {
    this.fakeRepository = [];
  }

  public async create(addressData: Address): Promise<Address> {
    this.fakeRepository.push(addressData);
    return addressData;
  }

  public async findByCep(cep: string): Promise<Address | undefined> {
    const foundAddress = this.fakeRepository.find((address) => cep === address.cep);
    return foundAddress;
  }
}
