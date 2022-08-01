import { Test, TestingModule } from '@nestjs/testing';
import { CustomersDto } from 'src/dto/customers.dto';
import { RedisMethods } from '../cache/redis';
import { Customers } from '../customers/customers';
import { CustomersController } from '../customers/customers.controller';
import { CustomersService } from '../customers/customers.service';

const customerEntity: Customers = {
  id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
  document: 123456,
  name: 'Maria',
};
const updatedCustomerEntity: Customers = {
  id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
  document: 223344,
  name: 'Maria do Código',
};
describe('CustomersController', () => {
  let customersService: CustomersService;
  let customersController: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        RedisMethods,
        CustomersService,
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn().mockResolvedValue(customerEntity),
            getById: jest.fn().mockResolvedValue(customerEntity),
            updateCustomer: jest.fn().mockResolvedValue(customerEntity),
            destroy: jest.fn().mockResolvedValue(customerEntity),
          },
        },
      ],
    }).compile();
    customersService = await module.resolve(CustomersService);
    customersController = await module.resolve(CustomersController);
  });

  it('should be defined', () => {
    expect(customersController).toBeDefined();
  });

  describe('create', () => {
    const body: CustomersDto = {
      id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
      document: 123456,
      name: 'Maria',
    };
    it('should create a new customer successfully', async () => {
      jest.spyOn(customersService, 'create').mockImplementation(() => body);

      const result = await customersController.create(customerEntity);

      expect(result).toEqual(customerEntity);
    });
    it('should throw a not found exception', () => {
      jest
        .spyOn(customersController, 'create')
        .mockRejectedValueOnce(new Error());

      expect(customersController.create(body)).rejects.toThrowError();
    });
  });
  describe('updateCustomer', () => {
    const body: CustomersDto = {
      id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
      document: 223344,
      name: 'Maria do Código',
    };
    it('should update the informations about a customer successfully', async () => {
      const result = await customersController.updateCustomer(
        customerEntity.id,
        body,
      );
      expect(result).toEqual(updatedCustomerEntity);
    });
    it('should throw a not found exception', () => {
      jest
        .spyOn(customersController, 'updateCustomer')
        .mockImplementation(() => Promise.reject(new Error('Not found!')));
      const expectTeste = async () => {
        await customersController.updateCustomer(body.id, body);
      };
      expect(expectTeste).rejects.toThrow(Error);
    });
  });

  describe('getById', () => {
    it('should get a customer successfully', async () => {
      const body: Customers = {
        id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
        document: 123456,
        name: 'Maria',
      };
      const result = await customersController.getById(body);
      expect(result).toEqual(customerEntity);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(customersService, 'getById')
        .mockRejectedValueOnce(new Error('Error'));
      expect(
        customersController.getById(customerEntity),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a customer successfully by ID', async () => {
      const result = await customersController.destroy(customerEntity);
      expect(result).toBeUndefined();
    });
    it('should throw an exception', () => {
      jest
        .spyOn(customersService, 'destroy')
        .mockRejectedValueOnce(new Error());

      expect(customersService.destroy).rejects.toThrowError();
    });
  });
});
