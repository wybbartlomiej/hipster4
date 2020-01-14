import { Moment } from 'moment';
import { IRent } from 'app/shared/model/rent.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
  id?: number;
  name?: string;
  writedAt?: Moment;
  rents?: IRent[];
  author?: IAuthor;
}

export class Book implements IBook {
  constructor(public id?: number, public name?: string, public writedAt?: Moment, public rents?: IRent[], public author?: IAuthor) {}
}
