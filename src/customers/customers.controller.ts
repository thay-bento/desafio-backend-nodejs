import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard.auth';
import { CustomersService } from './customers.service';
import { CreateCustomersDto as CreateCustomersDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Customers } from './customers';
import { CustomerSwagger } from 'src/swagger/customer.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { ForbbidenResourceSwagger } from 'src/helpers/swagger/forbidden-resource.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('customers')
@ApiBearerAuth()
// @UseGuards(RolesGuard)
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  @SetMetadata('roles', ['admin', 'user'])
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiUnauthorizedResponse()
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
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customers> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Get()
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
  async getAll(): Promise<Customers[]> {
    return this.customerService.getAll();
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
  async getById(@Param('id') id: string): Promise<Customers> {
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
  async destroy(@Param('id') id: string) {
    const destroyCustomer = await this.customerService.destroy(id);

    if (!destroyCustomer)
      throw new HttpException('Customer NOT FOUND!!', HttpStatus.NOT_FOUND);
  }
}
