import { Test, TestingModule } from '@nestjs/testing';
import { Customers } from '../customers/customers';
import { RedisMethods } from '../cache/redis';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomersDto } from '../dto/CreateCustomers.dto';
import { uuid } from 'uuidv4';

const customerEntity: Customers = {
  id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
  document: 123456,
  name: 'Maria',
};

describe('CustomersService', () => {
  let customersService: CustomersService;
  let redis: RedisMethods;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, RedisMethods],
    }).compile();
    customersService = module.get<CustomersService>(CustomersService);
    redis = module.get<RedisMethods>(RedisMethods);
  });
  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });

  describe('create', () => {
    const data: CreateCustomersDto = {
      id: uuid(),
      document: 123456,
      name: 'Maria',
    };
    it('should create a new customer successfully', async () => {
      jest.spyOn(customersService, 'create').mockImplementation(() => data);

      const result = customersService.create(data);

      expect(result).toEqual(data);
    });

    it('should throw an exception', () => {
      jest.spyOn<any, any>(redis, 'set').mockImplementation((): any => {
        throw new Error();
      });

      expect(() => {
        customersService.create(data);
      }).toThrow(new Error());
    });
  });
  describe('updateCustomer', () => {
    const data: CreateCustomersDto = {
      id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
      document: 223344,
      name: 'Mary',
    };
    it('should update the informations about a customer successfully', async () => {
      jest.spyOn(redis, 'get').mockResolvedValueOnce(customerEntity);
      const result = await customersService.updateCustomer(
        customerEntity.id,
        data,
      );
      expect(result).toEqual(data);
    });
    it('should throw a not found exception', () => {
      jest.spyOn(redis, 'get').mockRejectedValueOnce(new Error());
      jest.spyOn(redis, 'set').mockRejectedValueOnce(new Error());
      expect(
        customersService.updateCustomer(data.id, data),
      ).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('should get a customer successfully', async () => {
      jest.spyOn(redis, 'get').mockResolvedValueOnce(customerEntity);
      const result = await customersService.getById(customerEntity.id);
      expect(result).toEqual(customerEntity);
    });
  });
  describe('destroy', () => {
    it('should remove a customer successfully by ID', async () => {
      jest.spyOn(redis, 'del').mockImplementation();
      const result = await customersService.destroy(customerEntity.id);
      expect(result).toBeUndefined();
    });
  });
});
