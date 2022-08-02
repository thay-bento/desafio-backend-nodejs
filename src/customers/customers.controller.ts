import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers';
import { CreateCustomersDto } from '../dto/CreateCustomers.dto';
import { RolesGuard } from '../auth/roles.guard.auth';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerSwagger } from '../swagger/customer.swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { ForbbidenResourceSwagger } from 'src/helpers/swagger/forbidden-resource.swagger';

@Controller('customers')
@UseGuards(RolesGuard)
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @SetMetadata('roles', ['admin', 'user'])
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({
    status: 200,
    description: 'Created new customer',
    type: CustomerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Resource',
    type: ForbbidenResourceSwagger,
  })
  async create(@Body() customer: CreateCustomersDto): Promise<Customers> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  @SetMetadata('roles', ['admin', 'user'])
  @ApiOperation({ summary: 'Update the data from a customer ' })
  @ApiResponse({
    status: 200,
    description: 'Updated customer',
    type: CustomerSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Resource',
    type: ForbbidenResourceSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
    type: NotFoundSwagger,
  })
  async updateCustomer(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() customer: CreateCustomersDto,
  ) {
    return await this.customerService.updateCustomer(id, customer);
  }

  @Get(':id')
  @SetMetadata('roles', ['admin', 'user'])
  @ApiOperation({ summary: 'Get the data from a customer by ID' })
  @ApiResponse({
    status: 200,
    description: 'Customer found',
    type: CustomerSwagger,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Resource',
    type: ForbbidenResourceSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
    type: NotFoundSwagger,
  })
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const getCustomer = await this.customerService.getById(id);
    if (!getCustomer)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return getCustomer;
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin', 'user'])
  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({ status: 204, description: 'Customer deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden Resource',
    type: ForbbidenResourceSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    const destroyCustomer = await this.customerService.destroy(id);

    if (!destroyCustomer)
      throw new HttpException('Customer NOT FOUND!!', HttpStatus.NOT_FOUND);
  }
}
