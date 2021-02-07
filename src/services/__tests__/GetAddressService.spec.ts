import 'reflect-metadata';

import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import FakeAddressesRepository from '../../database/repositories/fakes/FakeAddressesRepository';
import GetAddressService from '../GetAddressService';

let fakeAddressesRepository: FakeAddressesRepository;
let getAddress: GetAddressService;

describe('GetMovie', () => {
  const ViaCepResponse = {
    cep: '01001000',
    logradouro: 'Praça da Sé',
    complemento: 'lado ímpar',
    bairro: 'Sé',
    localidade: 'São Paulo',
    uf: 'SP',
    ibge: '3550308',
    gia: '1004',
    ddd: '11',
    siafi: '7107',
  };

  beforeEach(() => {
    fakeAddressesRepository = new FakeAddressesRepository();
    getAddress = new GetAddressService(fakeAddressesRepository);

    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet()
      .reply(200, ViaCepResponse);
  });

  it('should be able to get an address from ViaCep', async () => {
    const address = await getAddress.execute('01001000');
    expect(address).toMatchObject(ViaCepResponse);
  });

  it('should return address from database if available', async () => {
    await getAddress.execute('01001000');

    const otherMock = new AxiosMockAdapter(axios);
    otherMock
      .onGet()
      .reply(404, {});

    const address = await getAddress.execute('01001000');
    expect(address).toMatchObject(ViaCepResponse);
  });

  it('should return a error if CEP does not contains 8 digits', async () => {
    await expect(getAddress.execute('1234567')).rejects;
    await expect(getAddress.execute('123456789')).rejects;
  });

  it('should return a error if database is unavailable to find CEP', async () => {
    jest
      .spyOn(fakeAddressesRepository, 'findByCep')
      .mockImplementation(() => {
        throw new Error('Test error');
      });

    await expect(getAddress.execute('01001000')).rejects;
  });

  it('should return a error if ViaCep is unavailable', async () => {
    const mock = new AxiosMockAdapter(axios);
    mock
      .onGet()
      .reply(400, { message: 'Test error' });

    await expect(getAddress.execute('01001000')).rejects;
  });

  it('should return a error if database is unavailable to save address', async () => {
    jest
      .spyOn(fakeAddressesRepository, 'create')
      .mockImplementationOnce(() => {
        throw new Error('Test error');
      });

    await expect(getAddress.execute('01001000')).rejects;
  });
});
