import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IBook } from 'app/shared/model/book.model';

export interface IRent {
  id?: number;
  term?: Moment;
  customer?: ICustomer;
  book?: IBook;
}

export class Rent implements IRent {
  constructor(public id?: number, public term?: Moment, public customer?: ICustomer, public book?: IBook) {}
}
