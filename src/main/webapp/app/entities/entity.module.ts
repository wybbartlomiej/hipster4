import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.App4AuthorModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.App4BookModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.App4CustomerModule)
      },
      {
        path: 'rent',
        loadChildren: () => import('./rent/rent.module').then(m => m.App4RentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class App4EntityModule {}
