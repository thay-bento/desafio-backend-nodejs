import { Test, TestingModule } from '@nestjs/testing';
import { Customers } from '../customers/customers';
import { RedisMethods } from '../redis';
import { CustomersService } from '../customers/customers.service';
import { CustomersDto } from 'src/dto/customers.dto';

const customerEntity: Customers = {
  id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
  document: 123456,
  name: 'Maria',
};

describe('CustomersService', () => {
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
        RedisMethods,
      ],
    }).compile();
    customersService = module.get<CustomersService>(CustomersService);
  });
  it('should be defined', () => {
    expect(customersService).toBeDefined();
  });

  describe('create', () => {
    const data: CustomersDto = {
      id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
      document: 123456,
      name: 'Maria',
    };
    it('should create a new customer successfully', async () => {
      jest.spyOn(customersService, 'create').mockImplementation(() => data);
      const result = customersService.create(data);
      expect(result).toEqual(customerEntity);
    });
  });
  describe('updateCustomer', () => {
    it('should update the informations about a customer successfully', async () => {
      jest
        .spyOn(customersService, 'updateCustomer')
        .mockImplementation((customers) => Promise.resolve(customers) as any);
      const result = await customersService.updateCustomer(customerEntity);
      expect(result).toEqual(customerEntity);
    });
    it('should throw a not found exception', () => {
      jest
        .spyOn(customersService, 'updateCustomer')
        .mockRejectedValueOnce(new Error());
      const data: CustomersDto = {
        id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
        document: 223344,
        name: 'Mary',
      };
      expect(customersService.updateCustomer(data)).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('should get a customer successfully', async () => {
      const body: Customers = {
        id: 'db2238ac-d1a2-499e-9a52-c167ac3efa56',
        document: 123456,
        name: 'Maria',
      };
      const result = await customersService.getById(body);
      expect(result).toEqual(customerEntity);
    });
    it('should throw an exception', () => {
      jest
        .spyOn(customersService, 'getById')
        .mockRejectedValueOnce(new Error('Error'));
      expect(customersService.getById(customerEntity)).rejects.toThrowError();
    });
  });
  describe('destroy', () => {
    it('should remove a customer successfully by ID', async () => {
      jest.spyOn(customersService, 'destroy').mockImplementation();
      const result = await customersService.destroy(customerEntity);
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
