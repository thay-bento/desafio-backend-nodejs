import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomersDto } from '../customers/dto/CreateCustomers.dto';
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
  name: 'Mary',
};
describe('CustomersController', () => {
  let customersService: CustomersService;
  let customersController: CustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [RedisMethods, CustomersService],
    }).compile();
    customersService = await module.resolve(CustomersService);
    customersController = await module.resolve(CustomersController);
  });

  it('should be defined', () => {
    expect(customersController).toBeDefined();
  });

  describe('create', () => {
    const body: CreateCustomersDto = {
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

      expect(customersController.create(customerEntity)).rejects.toThrowError();
    });
  });
  describe('updateCustomer', () => {
    it('should update the informations about a customer successfully', async () => {
      jest
        .spyOn(customersService, 'updateCustomer')
        .mockResolvedValueOnce(updatedCustomerEntity);

      const result = await customersController.updateCustomer(
        customerEntity.id,
        updatedCustomerEntity,
      );
      expect(result).toEqual(updatedCustomerEntity);
    });
    it('should throw a not found exception', () => {
      jest
        .spyOn(customersController, 'updateCustomer')
        .mockImplementation(() => Promise.reject(new Error('Not found!')));
      const expectTeste = async () => {
        await customersController.updateCustomer(
          customerEntity.id,
          customerEntity,
        );
      };
      expect(expectTeste).rejects.toThrow(Error);
    });
  });

  describe('getById', () => {
    it('should get a customer successfully', async () => {
      jest
        .spyOn(customersService, 'getById')
        .mockResolvedValueOnce(customerEntity);
      const id = 'db2238ac-d1a2-499e-9a52-c167ac3efa56';

      const result = await customersController.getById(id);
      expect(result).toEqual(customerEntity);
    });

    it('should throw a not found exception', () => {
      jest
        .spyOn(customersService, 'getById')
        .mockRejectedValueOnce(new Error('Error'));
      expect(
        customersController.getById(customerEntity.id),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a customer successfully by ID', async () => {
      jest.spyOn(customersService, 'destroy').mockImplementation();
      const callDestroy = async () => {
        await customersController.destroy(customerEntity.id);
      };

      expect(callDestroy).rejects.toThrowError();
    });
    it('should throw an exception', () => {
      jest
        .spyOn(customersService, 'destroy')
        .mockRejectedValueOnce(new Error());

      expect(customersService.destroy).rejects.toThrowError();
    });
  });
});
