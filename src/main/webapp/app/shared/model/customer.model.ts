import { IUser } from 'app/core/user/user.model';
import { IRent } from 'app/shared/model/rent.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  user?: IUser;
  rents?: IRent[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public user?: IUser,
    public rents?: IRent[]
  ) {}
}
