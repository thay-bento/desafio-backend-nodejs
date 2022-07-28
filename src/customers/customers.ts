export class Customers {
  id: string;

  document: number;

  name: string;

  constructor(customer?: Customers) {
    this.id = customer?.id;
    this.document = customer.document;
    this.name = customer.name;
  }
}
