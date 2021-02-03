import { getRepository, Repository } from 'typeorm';
import Address from '../models/Address';
import IAddressesRepository from './IAddressesRepository';

export default class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create(addressData: Address): Promise<Address> {
    const address = this.ormRepository.create(addressData);
    await this.ormRepository.save(address);

    return address;
  }

  public async findByCep(cep: number): Promise<Address | undefined> {
    const address = this.ormRepository.findOne(cep);

    return address;
  }
}
