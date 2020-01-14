import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App4SharedModule } from 'app/shared/shared.module';
import { RentComponent } from './rent.component';
import { RentDetailComponent } from './rent-detail.component';
import { RentUpdateComponent } from './rent-update.component';
import { RentDeleteDialogComponent } from './rent-delete-dialog.component';
import { rentRoute } from './rent.route';

@NgModule({
  imports: [App4SharedModule, RouterModule.forChild(rentRoute)],
  declarations: [RentComponent, RentDetailComponent, RentUpdateComponent, RentDeleteDialogComponent],
  entryComponents: [RentDeleteDialogComponent]
})
export class App4RentModule {}
