import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { App4SharedModule } from 'app/shared/shared.module';
import { AuthorComponent } from './author.component';
import { AuthorDetailComponent } from './author-detail.component';
import { AuthorUpdateComponent } from './author-update.component';
import { AuthorDeleteDialogComponent } from './author-delete-dialog.component';
import { authorRoute } from './author.route';

@NgModule({
  imports: [App4SharedModule, RouterModule.forChild(authorRoute)],
  declarations: [AuthorComponent, AuthorDetailComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent],
  entryComponents: [AuthorDeleteDialogComponent]
})
export class App4AuthorModule {}
