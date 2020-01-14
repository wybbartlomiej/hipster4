import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRent, Rent } from 'app/shared/model/rent.model';
import { RentService } from './rent.service';
import { RentComponent } from './rent.component';
import { RentDetailComponent } from './rent-detail.component';
import { RentUpdateComponent } from './rent-update.component';

@Injectable({ providedIn: 'root' })
export class RentResolve implements Resolve<IRent> {
  constructor(private service: RentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rent: HttpResponse<Rent>) => {
          if (rent.body) {
            return of(rent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Rent());
  }
}

export const rentRoute: Routes = [
  {
    path: '',
    component: RentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RentDetailComponent,
    resolve: {
      rent: RentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RentUpdateComponent,
    resolve: {
      rent: RentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rents'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RentUpdateComponent,
    resolve: {
      rent: RentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rents'
    },
    canActivate: [UserRouteAccessService]
  }
];
